# MacRank 安全与性能审查报告

## 执行摘要

本次审查涵盖 MacRank 项目的安全最佳实践和 React/Next.js 性能优化两个维度。发现 **7 个高优先级安全问题** 和 **6 个高优先级性能问题**。最严重的问题包括：API Key 在客户端暴露、AI 聊天组件未使用动态导入导致bundle体积过大、以及多处重渲染优化缺失。

---

## 第一部分：安全问题 (Security Issues)

### 严重程度：高 (High Severity)

#### **[SEC-01] API Key 客户端暴露风险**
- **文件**: [app/services/geminiService.ts:77](file:///workspace/app/services/geminiService.ts#L77)
- **问题**: `process.env.GEMINI_API_KEY` 在客户端组件中被直接访问
- **影响**: 如果 `GEMINI_API_KEY` 以 `NEXT_PUBLIC_` 前缀定义，API密钥将完全暴露在前端代码中
- **建议修复**: 将 AI 调用移至 Next.js API Route (`app/api/chat/route.ts`)，在服务端处理 API Key

```typescript
// 错误示例 (当前代码)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 建议修复：创建 API Route
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { query, contextData, language } = await request.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  // ... 调用逻辑
}
```

---

#### **[SEC-02] 用户输入未过滤直接注入 Prompt**
- **文件**: [app/services/geminiService.ts:103-108](file:///workspace/app/services/geminiService.ts#L103-L108)
- **问题**: 用户查询直接拼接到发送给 Gemini 的 prompt 中
- **影响**: 存在 Prompt Injection 攻击风险，恶意用户可能通过构造特殊输入操纵 AI 行为
- **建议修复**: 对用户输入进行基本清理和长度限制

```typescript
// 建议修复
const sanitizedQuery = query.slice(0, 500).replace(/[\x00-\x1F\x7F]/g, '');
```

---

#### **[SEC-03] AI 聊天功能缺少速率限制**
- **文件**: [app/components/AIChat.tsx:60-73](file:///workspace/app/components/AIChat.tsx#L60-L73)
- **问题**: 没有限制用户发送消息的频率
- **影响**: 可能被滥用导致 API 成本激增
- **建议修复**: 在 API Route 中实现速率限制，使用 `upstash/ratelimit` 或类似方案

---

#### **[SEC-04] localStorage 数据缺少验证**
- **文件**: [app/hooks/useSettings.ts:12-14](file:///workspace/app/hooks/useSettings.ts#L12-L14), [app/hooks/useMacData.ts](file:///workspace/app/hooks/useMacData.ts)
- **问题**: 直接从 localStorage 读取语言、主题等设置，没有任何 schema 验证
- **影响**: 恶意用户可能通过篡改 localStorage 注入恶意数据
- **建议修复**: 添加 JSON schema 验证，确保数据格式符合预期

```typescript
// 建议修复
const storedLang = localStorage.getItem('language');
if (storedLang && typeof storedLang === 'string' && translations[storedLang as Language]) {
  setLanguage(storedLang as Language);
}
```

---

#### **[SEC-05] URL Hash 参数缺少安全验证**
- **文件**: [app/lib/urlParams.ts:19-31](file:///workspace/app/lib/urlParams.ts#L19-L31)
- **问题**: URL hash 参数直接解析使用，无输入验证
- **影响**: 攻击者可能通过构造恶意 URL 参数触发 XSS 或其他攻击
- **建议修复**: 添加参数类型和长度验证

---

#### **[SEC-06] 主题切换直接操作 DOM**
- **文件**: [app/hooks/useSettings.ts:46-50](file:///workspace/app/hooks/useSettings.ts#L46-L50)
- **问题**: 使用 `classList.add/remove` 直接操作 DOM，绕过了 React 的 synthetic event 系统
- **影响**: 可能导致 hydration 不匹配和意外行为
- **建议修复**: 使用 Tailwind CSS 的 `darkMode: 'class'` 配置，通过 React state 管理

```typescript
// 建议修复
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}

// useSettings.ts - 删除直接 DOM 操作
// 只保留 setTheme 更新 state
```

---

### 严重程度：低 (Low Severity)

#### **[SEC-07] Markdown 渲染缺少安全防护**
- **文件**: [app/components/AIChat.tsx:158](file:///workspace/app/components/AIChat.tsx#L158)
- **问题**: 使用 `react-markdown` 渲染 AI 返回内容
- **影响**: 如果 AI 返回恶意 Markdown 内容可能导致 XSS
- **建议修复**: 使用 `remark-gfm` 和 `rehype-sanitize` 插件

---

## 第二部分：React/Next.js 性能问题

### 严重程度：高 (High Severity)

#### **[PERF-01] AIChat 组件未使用动态导入**
- **文件**: [app/page.tsx:122](file:///workspace/app/page.tsx#L122)
- **问题**: AIChat 组件包含重量级依赖（Google GenAI SDK、react-markdown、recharts），但作为浮动聊天窗口在首屏加载
- **影响**: 显著增加 Initial JS bundle 大小，影响 LCP 和 FCP
- **建议修复**: 使用 `next/dynamic` 懒加载 AIChat

```typescript
// 建议修复
import dynamic from 'next/dynamic';
const AIChat = dynamic(() => import('./components/AIChat'), {
  loading: () => null,
  ssr: false
});
```

---

#### **[PERF-02] 价格数据获取无去重/缓存**
- **文件**: [app/hooks/useMacData.ts:45-47](file:///workspace/app/hooks/useMacData.ts#L45-L47)
- **问题**: `fetchRealTimePrices` 在每次组件挂载时调用，无请求去重
- **影响**: 页面导航后可能产生重复请求
- **建议修复**: 使用 SWR 或 React Query 实现请求缓存和去重

---

#### **[PERF-03] 翻译函数引用不稳定**
- **文件**: [app/hooks/useSettings.ts:32-35](file:///workspace/app/hooks/useSettings.ts#L32-L35)
- **问题**: `t()` 函数在每次渲染时重新创建
- **影响**: 所有使用 `t()` 的组件都会不必要地重渲染
- **建议修复**: 使用 `useCallback` 或 `useMemo` 缓存

```typescript
// 建议修复
const t = useCallback((key: keyof typeof translations['en']) => {
  const dict = translations[language] || translations['en'];
  return dict[key] || translations['en'][key] || key;
}, [language]);
```

---

#### **[PERF-04] filteredData 计算依赖管理不当**
- **文件**: [app/hooks/useMacData.ts:67-110](file:///workspace/app/hooks/useMacData.ts#L67-L110)
- **问题**: `filteredData` 的 useMemo 依赖数组包含 `liveData` 对象引用，可能导致不必要的重新计算
- **影响**: 每次 `liveData` 引用变化都会触发完整的过滤和排序
- **建议修复**: 考虑使用 `useDeferredValue` 处理搜索词

---

### 严重程度：中 (Medium Severity)

#### **[PERF-05] 缺少 Suspense Boundaries**
- **文件**: 全局
- **问题**: 应用未使用 React Suspense 进行流式内容加载
- **影响**: 无法实现渐进式加载，用户体验不够流畅
- **建议修复**: 为动态导入的组件添加 Suspense 边界

---

#### **[PERF-06] Sort Handler 引用不稳定**
- **文件**: [app/hooks/useMacData.ts:112-117](file:///workspace/app/hooks/useMacData.ts#L112-L117)
- **问题**: `handleSort` 使用 `useCallback` 但没有为空数组或无关依赖
- **影响**: 可能导致子组件不必要的重渲染
- **建议修复**: 确认 `useCallback` 依赖完整

---

## 修复优先级建议

### 立即修复（影响最大的问题）
1. **[SEC-01]** 将 API 调用移至服务端 API Route（防止 API Key 泄露）
2. **[PERF-01]** AIChat 使用动态导入（大幅减小首屏 bundle）

### 短期修复
3. **[SEC-02]** 用户输入过滤
4. **[SEC-03]** 添加速率限制
5. **[PERF-03]** 修复翻译函数引用稳定性

### 中期改进
6. **[SEC-04]** localStorage 数据验证
7. **[SEC-05]** URL 参数验证
8. **[PERF-02]** 添加数据请求缓存

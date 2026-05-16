# 技术栈与架构深度文档

## 1. 核心框架与运行时
*   **Next.js 14**: 基于 React 的全栈框架，采用 App Router 架构，支持 SSR/SSG 混合渲染模式。
*   **React 18.3.1**: UI 框架，使用 Hooks API (`useMemo`, `useContext`, `useRef`) 管理状态。
*   **TypeScript 5.5.3**: 严格类型检查，提升代码质量与可维护性。
*   **ES Modules (ESM)**: 模块化开发，通过 package.json 管理依赖。

## 2. 核心依赖版本

| 依赖包 | 版本 | 用途 |
| :--- | :--- | :--- |
| `react` | ^18.3.1 | UI 框架 |
| `react-dom` | ^18.3.1 | React DOM 渲染 |
| `next` | ^14.2.0 | 全栈框架 |
| `@google/genai` | ^0.2.0 | Gemini AI SDK |
| `lucide-react` | ^0.428.0 | SVG 图标库 |
| `recharts` | ^2.12.0 | 数据可视化 |
| `typescript` | ^5.5.3 | 类型检查 |
| `@types/react` | ^18.3.3 | React 类型定义 |
| `@types/react-dom` | ^18.3.0 | React DOM 类型定义 |
| `tailwindcss` | ^3.4.0 | CSS 框架 |
| `eslint` | ^8.0.0 | 代码检查 |
| `eslint-config-next` | ^14.2.0 | Next.js ESLint 配置 |

## 3. 样式与主题架构
*   **Tailwind CSS 3.4**: 负责 95% 的原子化样式、布局、响应式设计和深色模式 (`dark:` 修饰符)。
*   **Custom CSS**: `app/style.css`
    *   处理 Webkit 滚动条美化。
    *   字体平滑渲染 (`antialiased`)。
    *   移动端弹性滚动行为控制。
*   **Glassmorphism**: 使用 `backdrop-blur-md` 和 `bg-opacity` 模拟 macOS 风格。

## 4. 数据流与状态管理
*   **Global Context**: `LanguageContext` (轻量级 i18n)。
*   **React Hooks**:
    *   `useState`: UI 交互状态。
    *   `useMemo`: 复杂数据过滤与排序的缓存，确保大数据量下的渲染性能。
    *   `useRef`: 处理滚动位置与非受控组件引用。
*   **URL 同步**: 使用 `history.replaceState` 将筛选、排序、对比状态同步到 URL 查询参数，支持分享链接恢复状态。

## 5. AI 架构 (Client-Side RAG)
*   **SDK**: `@google/genai` (Gemini API)
*   **模型**: `gemini-3-flash-preview`
*   **策略**: 
    *   **Context Pruning**: 动态截取 Top 40 机型注入 Prompt (按年份和多核评分排序)。
    *   **Latency Optimization**: 设置 `thinkingBudget: 0` 关闭思维链以提高响应速度。
    *   **Offline Fallback**: 网络不可用时，使用本地关键词匹配逻辑提供基础建议。
*   **服务封装**: `services/geminiService.ts` - 包含 `getMacAdvice` 异步函数和离线逻辑 `getOfflineAdvice`。

## 6. 数据可视化
*   **Recharts 2.12**: 
    *   响应式容器 (`ResponsiveContainer`)。
    *   雷达图 (Comparison Modal)。
    *   组合图表 (Bar + Scatter)。
    *   条形图 (Top 15 Index)。

## 7. PWA 生态
*   **next.config.ts 配置**:
    *   `output: 'export'` 启用静态导出。
    *   Service Worker 注册用于离线缓存。
    *   `Manifest`: 定义 Standalone 模式与应用图标。

## 8. 国际化 (i18n)
*   **模块化方案**: 按语言拆分文件到 `lib/locales/`。
*   **支持语言**: English, 简体中文, Español, Français, Deutsch, 日本語, Português, Русский, 한국어, हिन्दी (共 10 种)。
*   **上下文**: `LanguageContext.Provider` 提供 `language`, `setLanguage`, `t` 函数。

## 9. 开发工具链 (DevOps)
*   **Linting**: ESLint + TypeScript 类型检查 (`npm run lint`)。
*   **Formatter**: 代码格式化 (建议 Prettier)。
*   **Iconography**: Lucide React (SVG Icons)。
*   **Deployment**: 兼容 Vercel, Netlify, GitHub Pages 等静态托管。

## 10. 关键架构决策
- **App Router 架构**: 使用 Next.js 14 App Router，所有页面组件放在 `app/` 目录。
- **组件原子化**: 所有 UI 组件存放在 `app/components/` 目录，避免页面组件过大。
- **服务隔离**: AI 调用逻辑封装在 `services/geminiService.ts`，便于测试和替换。
- **数据分离**: 机型数据按来源拆分到多个文件 (`data-silicon.ts`, `data-intel.ts`, `data-reference.ts`)，便于维护扩展。
- **静态导出**: Next.js 配置 `output: 'export'` 以支持完全静态化部署。

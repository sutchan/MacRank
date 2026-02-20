# 技术栈与架构深度文档

## 1. 核心框架与运行时
*   **React 18.3.1**: 目前最稳定的 React 版本，兼容所有主流生态库。使用 Hooks API (`useMemo`, `useContext`, `useRef`) 管理状态。
*   **Vite 5.4.1**: 高性能前端构建工具，支持 HMR (热模块替换) 和优化的生产环境打包。
*   **ES Modules (ESM)**: 
    *   **开发环境**: Vite 本地服务。
    *   **生产环境**: 通过 package.json 管理依赖。

## 2. 核心依赖版本

| 依赖包 | 版本 | 用途 |
| :--- | :--- | :--- |
| `react` | ^18.3.1 | UI 框架 |
| `react-dom` | ^18.3.1 | React DOM 渲染 |
| `@google/genai` | ^0.2.0 | Gemini AI SDK |
| `lucide-react` | ^0.428.0 | SVG 图标库 |
| `recharts` | ^2.12.0 | 数据可视化 |
| `@vitejs/plugin-react` | ^4.3.1 | Vite React 插件 |
| `vite` | ^5.4.1 | 构建工具 |
| `vite-plugin-pwa` | ^0.20.0 | PWA 支持 |
| `typescript` | ^5.5.3 | 类型检查 |
| `@types/react` | ^18.3.3 | React 类型定义 |
| `@types/react-dom` | ^18.3.0 | React DOM 类型定义 |

## 3. 样式与主题架构
*   **Tailwind CSS 3.x**: 负责 95% 的原子化样式、布局、响应式设计和深色模式 (`dark:` 修饰符)。
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
*   **vite-plugin-pwa**:
    *   `Auto Update`: Service Worker 自动更新。
    *   `CacheFirst`: 静态资源激进缓存策略。
    *   `Manifest`: 定义 Standalone 模式与应用图标。

## 8. 国际化 (i18n)
*   **模块化方案**: 按语言拆分文件到 `lib/locales/`。
*   **支持语言**: English, 简体中文, Español, Français, Deutsch, 日本語, Português, Русский, 한국어, हिन्दी (共 10 种)。
*   **上下文**: `LanguageContext.Provider` 提供 `language`, `setLanguage`, `t` 函数。

## 9. 开发工具链 (DevOps)
*   **Linting**: TypeScript 类型检查。
*   **Formatter**: 建议 Prettier 配置。
*   **Iconography**: Lucide React (SVG Icons)。
*   **Deployment**: 兼容 Vercel, Netlify, Github Pages 等静态托管。

## 10. 关键架构决策
- **组件原子化**: 所有 UI 组件存放在 `components/` 目录，避免 App.tsx 过大。
- **服务隔离**: AI 调用逻辑封装在 `services/geminiService.ts`，便于测试和替换。
- **数据分离**: 机型数据按来源拆分到多个文件，便于维护扩展。

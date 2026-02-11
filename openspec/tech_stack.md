# 技术栈与架构深度文档

## 1. 核心框架与运行时
*   **React 18.3.1**: 目前最稳定的 React 版本，兼容所有主流生态库。使用 Hooks API (`useMemo`, `useContext`) 管理状态。
*   **Vite 5**: 高性能前端构建工具，支持 HMR (热模块替换) 和优化的生产环境打包。
*   **ES Modules (ESM)**: 
    *   **开发环境**: Vite 本地服务。
    *   **生产环境**: 通过 Import Map 映射核心库 (`react`, `react-dom`, `recharts`) 到 CDN (`esm.sh`)，实现**零构建依赖 (Zero-Bundle Dependencies)** 策略，显著减小主包体积。

## 2. 样式与主题架构
*   **Tailwind CSS 3.4**: 负责 95% 的原子化样式、布局、响应式设计和深色模式 (`dark:` 修饰符)。
*   **Custom CSS**: `app/style.css`
    *   处理 Webkit 滚动条美化。
    *   字体平滑渲染 (`antialiased`)。
    *   移动端弹性滚动行为控制。
*   **Glassmorphism**: 使用 `backdrop-blur-md` 和 `bg-opacity` 模拟 macOS 风格。

## 3. 数据流与状态管理
*   **Global Context**: `LanguageContext` (轻量级 i18n)。
*   **React Hooks**:
    *   `useState`: UI 交互状态。
    *   `useMemo`: 复杂数据过滤与排序的缓存，确保大数据量下的渲染性能。
    *   `useRef`: 处理滚动位置与非受控组件引用。

## 4. AI 架构 (Client-Side RAG)
*   **SDK**: `@google/genai` (Gemini API)
*   **模型**: `gemini-3-flash-preview`
*   **策略**: 
    *   **Context Pruning**: 动态截取 Top 40 机型注入 Prompt。
    *   **Latency Optimization**: 设置 `thinkingBudget: 0` 关闭思维链以提高响应速度。

## 5. 数据可视化
*   **Recharts 2.x**: 
    *   响应式容器 (`ResponsiveContainer`)。
    *   雷达图 (Comparison Modal)。
    *   组合图表 (Bar + Scatter)。

## 6. PWA 生态
*   **vite-plugin-pwa**:
    *   `Auto Update`: Service Worker 自动更新。
    *   `CacheFirst`: 静态资源与 CDN 链接激进缓存策略。
    *   `Manifest`: 定义 Standalone 模式与应用图标。

## 7. 开发工具链 (DevOps)
*   **Linting**: ESLint + TypeScript ESLint.
*   **Formatter**: Prettier (建议配置).
*   **Iconography**: Lucide React (SVG Icons).
*   **Deployment**: 兼容 Vercel, Netlify, Github Pages 等静态托管。

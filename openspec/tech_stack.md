# 技术栈与架构文档

## 1. 核心框架
*   **基础库**: React 19
*   **开发语言**: TypeScript (TSX)
*   **模块系统**: ES Modules (ESM)
    *   *选型理由*: 应用通过 `esm.sh` 直接在浏览器中加载原生 ES 模块。这种方式消除了复杂的本地构建步骤，非常适合快速原型开发和无构建环境的即时预览。

## 2. 用户界面 (UI) 与样式
*   **CSS 框架**: Tailwind CSS (v3.4)
    *   *实现方式*: 通过 CDN (`cdn.tailwindcss.com`) 运行时加载。
    *   *配置*: 扩展了 Apple 风格的配色板 (`gray-50` 等) 和字体栈 (`-apple-system`, `SF Pro Text`)。支持 `class` 策略的深色模式。
*   **图标库**: Lucide React
    *   *选型理由*: 轻量级、风格统一且支持 Tree-shaking 的 SVG 图标库。
*   **字体**: Inter / Apple System Fonts
    *   *选型理由*: 保持与 macOS/iOS 原生体验一致的视觉感受。

## 3. 数据可视化
*   **图表库**: Recharts
    *   *选型理由*: 专为 React 设计的声明式图表库。能够高效处理 SVG 渲染，并完美支持响应式容器 (`ResponsiveContainer`)，用于绘制性能天梯图。

## 4. 人工智能 (AI)
*   **SDK**: `@google/genai` (Google GenAI SDK)
*   **模型**: `gemini-3-flash-preview`
*   **集成模式**:
    *   **客户端直连**: 浏览器端直接调用 Gemini API。
    *   **上下文注入 (RAG-lite)**: 将结构化的 Mac 机型数据（名称、芯片、跑分、价格）序列化为文本，注入到系统提示词中，使 AI 具备最新的硬件知识库。
    *   **延迟初始化**: SDK 实例在 `getMacAdvice` 函数被调用时才创建，并包含完整的错误捕获机制，确保 API Key 缺失不会阻塞 UI 渲染。
    *   **参数调优**: `thinkingBudget: 0` (关闭思维链以降低延迟)。

## 5. 状态管理
*   **方案**: React Hooks (`useState`, `useMemo`, `useEffect`, `useContext`)
    *   **Context API**: 用于全局管理 `LanguageContext` (多语言状态)。
    *   **本地状态**: 用于管理过滤条件、搜索词、对比列表和聊天记录。
    *   **性能优化**: 使用 `useMemo` 对高频触发的数据过滤和排序逻辑进行缓存。

## 6. 依赖映射 (Import Map)
应用通过 `index.html` 中的 Import Map 定义依赖来源：

| 包名 | 来源 | 版本 | 用途 |
| :--- | :--- | :--- | :--- |
| `react` | esm.sh | ^19.2.4 | UI 核心 |
| `react-dom` | esm.sh | ^19.2.4 | DOM 渲染 |
| `@google/genai` | esm.sh | ^1.40.0 | AI 逻辑 |
| `lucide-react` | esm.sh | ^0.563.0 | 图标资源 |
| `recharts` | esm.sh | ^3.7.0 | 图表绘制 |
| `vite` | esm.sh | ^7.3.1 | 开发服务器 |

## 7. 性能与优化
*   **上下文裁剪**: 发送给 AI 的上下文被限制为“相关性最高的前 40 款机型”，并按年份倒序排列，以减少 Token 消耗并提升首字生成速度。
*   **无二进制资源**: 所有图标均为 SVG 代码，无本地图片资源，依赖全部 CDN 化，确保秒级加载。
*   **移动端适配**: 表格和图表区域支持横向滚动，确保在小屏设备上的可用性。

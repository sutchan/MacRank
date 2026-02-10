# 技术栈与架构深度文档

## 1. 核心框架与运行时
*   **React 19**: 利用最新的 Hooks API (`useMemo` 深度优化过滤逻辑, `useContext` 管理全局状态)。
*   **ES Modules (ESM)**: 浏览器原生模块加载。
    *   *优势*: 零编译启动，极速开发体验。
    *   *实现*: 通过 `importmap` 映射 `react`, `react-dom`, `recharts` 等到 `esm.sh` CDN。

## 2. 样式与主题架构
*   **Tailwind CSS**: 负责 95% 的原子化样式、布局、响应式设计和深色模式 (`dark:` 修饰符)。
*   **Custom CSS**: `app/style.css`
    *   **用途**: 处理 Tailwind 难以覆盖的特定浏览器行为。
    *   **内容**: Webkit 滚动条美化、字体平滑渲染 (`antialiased`)、iOS 弹性滚动行为控制。
*   **Glassmorphism**: 使用 `backdrop-blur-md` 和 `bg-opacity` 模拟 macOS 的毛玻璃效果，主要用于 Header 和模态框。

## 3. PWA 与离线能力 (Progressive Web App)
*   **插件**: `vite-plugin-pwa`
*   **配置策略**:
    *   `registerType: 'autoUpdate'`: 自动更新 Service Worker。
    *   **Manifest**: 定义了名称、图标、主题色，支持 "Standalone" 模式（隐藏浏览器地址栏，类原生体验）。
    *   **缓存策略 (Runtime Caching)**:
        *   **CDN 资源**: 针对 `esm.sh` 和 `tailwindcss.com` 配置 `CacheFirst` 策略，缓存时长 30 天-1 年。这确保了应用在无网环境下加载核心库的能力。
        *   **静态资源**: 图片、图标等本地资源自动缓存。

## 4. 数据流与状态管理
*   **全局上下文 (Context)**:
    *   `LanguageContext`: 管理当前语言 (`en`, `zh` 等) 及翻译函数 `t()`。
*   **本地状态 (Local State)**:
    *   `compareList`: 数组存储选中的 `MacModel` 对象 (Max length = 2)。
    *   `filter/sort`: 存储用户的筛选偏好。
*   **计算属性 (Derived State)**:
    *   使用 `useMemo` 基于原始 `macData` + `searchTerm` + `filters` 实时计算 `filteredData`，避免在大数据量（含Intel旧机型）下的渲染卡顿。

## 5. AI 架构与优化 (RAG-Lite)
*   **SDK**: `@google/genai`
*   **上下文注入策略**:
    *   **动态剪裁**: 为了防止 Token 超限和降低延迟，不发送整个数据库。而是先按“年份”和“多核跑分”降序排列，截取 **Top 40** 热门机型。
    *   **序列化**: 将机型对象转化为精简的文本描述 (`Name (Chip): Score, Price`) 注入 System Prompt。
*   **延迟优化**:
    *   `thinkingBudget: 0`: 强制关闭 Gemini 的思维链模式，优先保证聊天响应速度。
    *   **客户端直连**: 减少中间层转发延迟。

## 6. 数据可视化技术
*   **库**: Recharts
*   **实现细节**:
    *   **响应式**: 使用 `ResponsiveContainer` 确保图表随窗口缩放。
    *   **雷达图 (Radar)**: 在对比模式下展示 5 维数据，数据归一化到 0-100 区间。
    *   **动态填充**: Bar Chart 的颜色根据评分段位 (`Tier`) 动态计算 (S+ 为紫色渐变, A 为蓝色等)。
    *   **散点图**: 使用 `ScatterChart` 实现价格(X)与性能(Y)的二维分析，并绘制平均值参考线 (`ReferenceLine`) 划分象限。

## 7. 国际化 (i18n)
*   **实现**: 模块化文件结构 (`lib/locales/*.ts`)，不依赖第三方重型库。
*   **架构**:
    *   `lib/locales/`: 每个语言（en, zh, es, etc.）拥有独立的 TS 文件。
    *   `lib/translations.ts`: 负责聚合所有语言包并导出 `LanguageContext`。
*   **功能**:
    *   支持 10 种语言。
    *   **货币格式化**: 根据语言环境 (`Intl.NumberFormat`) 自动转换货币符号及汇率估算（静态汇率）。
    *   **SEO**: 根据当前语言动态更新 `document.title`。

## 8. 性能优化
*   **代码分割**: 
    *   数据文件按芯片架构拆分 (`data-silicon.ts`, `data-intel.ts`)。
    *   翻译文件按语言拆分，虽然目前主 bundle 包含所有，但结构上支持未来的动态导入。
*   **渲染优化**: 
    *   `content-visibility: auto`: 优化长表格渲染。
    *   `will-change`: 优化悬浮组件动画。
*   **无阻塞渲染**: 详情模态框和聊天窗口使用 React Portal 或固定定位层，避免触发主文档流重排。
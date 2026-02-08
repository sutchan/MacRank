# 技术栈与架构深度文档

## 1. 核心框架与运行时
*   **React 19**: 利用最新的 Hooks API (`useMemo` 深度优化过滤逻辑, `useContext` 管理全局状态)。
*   **ES Modules (ESM)**: 浏览器原生模块加载。
    *   *优势*: 零编译启动，极速开发体验。
    *   *实现*: 通过 `importmap` 映射 `react`, `react-dom`, `recharts` 等到 `esm.sh` CDN。

## 2. PWA 与离线能力 (Progressive Web App)
*   **插件**: `vite-plugin-pwa`
*   **配置策略**:
    *   `registerType: 'autoUpdate'`: 自动更新 Service Worker。
    *   **Manifest**: 定义了名称、图标、主题色，支持 "Standalone" 模式（隐藏浏览器地址栏，类原生体验）。
    *   **缓存策略 (Runtime Caching)**:
        *   **CDN 资源**: 针对 `esm.sh` 和 `tailwindcss.com` 配置 `CacheFirst` 策略，缓存时长 30 天-1 年。这确保了应用在无网环境下加载核心库的能力。
        *   **静态资源**: 图片、图标等本地资源自动缓存。

## 3. 数据流与状态管理
*   **全局上下文 (Context)**:
    *   `LanguageContext`: 管理当前语言 (`en`, `zh` 等) 及翻译函数 `t()`。
*   **本地状态 (Local State)**:
    *   `compareList`: 数组存储选中的 `MacModel` 对象 (Max length = 2)。
    *   `filter/sort`: 存储用户的筛选偏好。
*   **计算属性 (Derived State)**:
    *   使用 `useMemo` 基于原始 `macData` + `searchTerm` + `filters` 实时计算 `filteredData`，避免在大数据量（含Intel旧机型）下的渲染卡顿。

## 4. AI 架构与优化 (RAG-Lite)
*   **SDK**: `@google/genai`
*   **上下文注入策略**:
    *   **动态剪裁**: 为了防止 Token 超限和降低延迟，不发送整个数据库。而是先按“年份”和“多核跑分”降序排列，截取 **Top 40** 热门机型。
    *   **序列化**: 将机型对象转化为精简的文本描述 (`Name (Chip): Score, Price`) 注入 System Prompt。
*   **延迟优化**:
    *   `thinkingBudget: 0`: 强制关闭 Gemini 的思维链模式，优先保证聊天响应速度。
    *   **客户端直连**: 减少中间层转发延迟。

## 5. 数据可视化技术
*   **库**: Recharts
*   **实现细节**:
    *   **响应式**: 使用 `ResponsiveContainer` 确保图表随窗口缩放。
    *   **动态填充**: Bar Chart 的颜色根据评分段位 (`Tier`) 动态计算 (S+ 为紫色渐变, A 为蓝色等)。
    *   **散点图**: 使用 `ScatterChart` 实现价格(X)与性能(Y)的二维分析，并绘制平均值参考线 (`ReferenceLine`) 划分象限。

## 6. 国际化 (i18n)
*   **实现**: 不依赖第三方重型库 (如 i18next)，使用轻量级 TypeScript 对象字典 (`lib/translations.ts`)。
*   **功能**:
    *   支持 10 种语言。
    *   **货币格式化**: 根据语言环境 (`Intl.NumberFormat`) 自动转换货币符号及汇率估算（静态汇率）。
    *   **SEO**: 根据当前语言动态更新 `document.title`。

## 7. 性能优化
*   **代码分割**: 数据文件按芯片架构拆分 (`data-silicon.ts`, `data-intel.ts`)，虽然目前全量加载，但为未来按需加载打下基础。
*   **虚拟列表替代方案**: 当前数据量 (~60条) 尚不需要虚拟列表，但通过 `content-visibility: auto` 和 `will-change` 属性优化了表格滚动性能。
*   **无阻塞渲染**: 详情模态框和聊天窗口使用 React Portal 或固定定位层，避免触发主文档流重排。

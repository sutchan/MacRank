# 项目目录结构说明 (Directory Structure)

## 根目录
*   `index.html`: 应用入口 HTML，包含 Meta 标签、PWA 配置、Tailwind CDN 配置及 ImportMap。
*   `index.tsx`: React 应用挂载点。
*   `App.tsx`: 主应用组件，包含路由逻辑（虽然是单页滚动）、全局状态管理 (Context) 和主布局。
*   `vite.config.ts`: Vite 构建配置，包含 PWA 插件配置和环境变量处理。
*   `tsconfig.json`: TypeScript 编译配置。
*   `package.json`: 项目依赖与脚本。

## 核心源码目录

### `/components` (UI 组件)
*   `MacTable.tsx`: 核心排行榜表格组件，处理数据展示与行交互。
*   `PerformanceChart.tsx`: 基于 Recharts 的可视化图表组件，支持多模式切换。
*   `DetailModal.tsx`: 机型详情弹窗，展示详细规格与评分条。
*   `CompareModal.tsx`: 对比模式弹窗，展示双机型参数与性能差异条。
*   `AIChat.tsx`: AI 悬浮聊天组件，包含聊天界面与输入逻辑。
*   `TierBadge.tsx`: 显示 S+/S/A/B 等段位的徽章组件。

### `/lib` (数据与逻辑)
*   `data.ts`: 数据入口文件，聚合 Silicon 和 Intel 数据。
*   `data-silicon.ts`: 存储 Apple Silicon (M1-M4) 机型数据。
*   `data-intel.ts`: 存储 Intel (2010-2020) 机型数据。
*   `scoring.ts`: 包含综合评分计算算法 (`calculateTierScore`) 和段位映射逻辑。
*   `translations.ts`: 国际化字典 (10 种语言) 及货币格式化工具。
*   `types.ts`: TypeScript 接口定义 (`MacModel`, `DeviceType`, `ChipFamily` 等)。

### `/services` (外部服务)
*   `geminiService.ts`: 封装 Google Gemini API 调用逻辑，包含 System Prompt 构建与上下文注入。

### `/app` (全局样式)
*   `style.css`: 自定义全局样式，补充 Tailwind 未覆盖的 Webkit 滚动条与动画细节。

### `/openspec` (规范文档)
*   `specification.md`: 产品规格说明书。
*   `features.md`: 功能详细说明书。
*   `tech_stack.md`: 技术栈与架构文档。
*   `data_dictionary.md`: 数据字典与算法定义。
*   `ui_design.md`: UI 设计规范。
*   `roadmap.md`: 项目路线图。
*   `directory_structure.md`: 本文件。

### `/public` (静态资源)
*   `icon.svg`: 应用图标 (Logo)。
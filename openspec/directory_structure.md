# 项目目录结构说明 (Directory Structure)

## 根目录
*   `index.html`: 应用入口 HTML，包含 Meta 标签、PWA 配置、Tailwind CDN 配置及 ImportMap。
*   `index.tsx`: React 应用挂载点。
*   `App.tsx`: 主应用组件，包含路由逻辑、全局状态管理和主布局。
*   `vite.config.ts`: Vite 构建配置。
*   `tsconfig.json`: TypeScript 编译配置。
*   `package.json`: 项目依赖与脚本。
*   `metadata.json`: 项目元数据定义。
*   `CHANGELOG.md`: 版本变更记录。
*   `README.md` / `README_zh-CN.md`: 项目说明文档。

## 核心源码目录

### `/components` (UI 组件)
*   `Header.tsx`: 顶部导航栏。
*   `Hero.tsx`: 首页标题区域。
*   `FilterControls.tsx`: 筛选与排序控制栏。
*   `MacTable.tsx`: 核心排行榜表格。
*   `PerformanceChart.tsx`: 可视化图表组件。
*   `DetailModal.tsx`: 机型详情弹窗。
*   `CompareModal.tsx`: 对比模式弹窗。
*   `AIChat.tsx`: AI 悬浮聊天组件。
*   `SettingsModal.tsx`: 设置弹窗。
*   `Footer.tsx`: 底部页脚。
*   `TierBadge.tsx`: 段位徽章组件。

### `/lib` (数据与逻辑)
*   `data.ts`: 数据统一出口。
*   `data-silicon.ts`: Apple Silicon 机型数据。
*   `data-intel.ts`: Intel 机型数据。
*   `data-reference.ts`: PC/GPU 参考数据。
*   `scoring.ts`: 评分算法与段位逻辑。
*   `translations.ts`: 国际化上下文与工具函数。
*   `types.ts`: TypeScript 类型定义。
*   `locales/`: 语言包目录 (`en.ts`, `zh.ts`, ...)。

### `/services` (外部服务)
*   `geminiService.ts`: Google Gemini API 集成逻辑。

### `/app` (全局样式)
*   `style.css`: 自定义全局样式。

### `/openspec` (规范文档)
*   `project_rules.md`: 项目核心规则与规范。
*   `specification.md`: 项目规格索引文件 (Master Index)。
*   `features.md`: 功能详细说明书。
*   `tech_stack.md`: 技术栈与架构文档。
*   `api_interface.md`: API 接口与服务定义。
*   `data_dictionary.md`: 数据字典与算法定义。
*   `ui_design.md`: UI 设计规范。
*   `testing_strategy.md`: 测试策略。
*   `deployment.md`: 部署指南。
*   `roadmap.md`: 项目路线图。
*   `directory_structure.md`: 本文件。

### `/public` (静态资源)
*   `icon.svg`: 应用图标。
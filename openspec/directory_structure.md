# 项目目录结构说明 (Directory Structure)

## 根目录
*   `app/`: Next.js App Router 目录，包含所有页面和布局
*   `app/page.tsx`: 主页面入口
*   `app/layout.tsx`: 根布局文件
*   `next.config.ts`: Next.js 构建配置
*   `tsconfig.json`: TypeScript 编译配置
*   `tailwind.config.ts`: Tailwind CSS 配置
*   `postcss.config.js`: PostCSS 配置
*   `package.json`: 项目依赖与脚本
*   `metadata.json`: 项目元数据定义
*   `CHANGELOG.md`: 版本变更记录
*   `README.md` / `README_zh-CN.md`: 项目说明文档
*   `AGENTS.md`: AI Agent 工作流文档

## 核心源码目录

### `/app` (Next.js App Router)
*   `app/page.tsx`: 主页面组件，包含排行榜逻辑
*   `app/layout.tsx`: 根布局，包含 Meta 标签、JSON-LD 结构化数据、Google Analytics

### `/app/components` (UI 组件)
*   `Header.tsx`: 顶部导航栏
*   `Hero.tsx`: 首页标题区域
*   `FilterControls.tsx`: 筛选与排序控制栏
*   `MacTable.tsx`: 核心排行榜表格
*   `PerformanceChart.tsx`: 可视化图表组件
*   `DetailModal.tsx`: 机型详情弹窗
*   `CompareModal.tsx`: 对比模式弹窗
*   `AIChat.tsx`: AI 悬浮聊天组件
*   `SettingsModal.tsx`: 设置弹窗
*   `Footer.tsx`: 底部页脚
*   `TierBadge.tsx`: 段位徽章组件

### `/app/lib` (数据与逻辑)
*   `data.ts`: 数据统一出口，聚合所有机型数据
*   `data-silicon.ts`: Apple Silicon (M1-M4) 机型数据
*   `data-intel.ts`: Intel 机型数据
*   `data-reference.ts`: PC/GPU 参考硬件数据
*   `scoring.ts`: 评分算法与段位逻辑
*   `translations.ts`: 国际化上下文与工具函数
*   `types.ts`: TypeScript 类型定义
*   `share.ts`: Web Share API 辅助函数
*   `locales/`: 语言包目录
    *   `en.ts`: 英语翻译
    *   `zh.ts`: 简体中文翻译
    *   `es.ts`: 西班牙语翻译
    *   `fr.ts`: 法语翻译
    *   `de.ts`: 德语翻译
    *   `ja.ts`: 日语翻译
    *   `pt.ts`: 葡萄牙语翻译
    *   `ru.ts`: 俄语翻译
    *   `ko.ts`: 韩语翻译
    *   `hi.ts`: 印地语翻译

### `/app/styles` (样式文件)
*   `app/globals.css`: 全局样式与 Tailwind 指令
*   `app/style.css`: 自定义样式（滚动条、Webkit 特性）

### `/app/services` (外部服务)
*   `geminiService.ts`: Google Gemini API 集成逻辑

### `/public` (静态资源)
*   `public/icon.svg`: 应用图标
*   `public/manifest.json`: PWA 清单

### `/openspec` (规范文档)
*   `project.md`: 项目定义文档
*   `project_rules.md`: 项目核心规则与规范
*   `specification.md`: 产品规格说明书
*   `features.md`: 功能详细说明书
*   `tech_stack.md`: 技术栈与架构文档
*   `api_interface.md`: API 接口与服务定义
*   `data_dictionary.md`: 数据字典与算法定义
*   `ui_design.md`: UI 设计规范
*   `testing_strategy.md`: 测试策略
*   `deployment.md`: 部署指南
*   `roadmap.md`: 项目路线图
*   `directory_structure.md`: 本文件
*   `agents.md`: AI Agent 工作流定义
*   `reviews/`: 项目审查报告目录

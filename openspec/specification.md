# MacRank 应用规格说明书

## 1. 项目概述
MacRank 是一个针对苹果 Mac 电脑（涵盖 M1-M4 系列及 2010-2020 Intel 经典机型）和 iPad Pro/Air 系列的性能排行榜与智能导购助手。它结合了详尽的硬件基准测试数据与 AI 辅助决策系统，帮助用户在复杂的机型中找到最适合自己工作流的设备。

**当前版本**: v0.3.0

## 2. 技术架构概览
- **核心框架**: React 19 (Hooks 模式)
- **构建系统**: Vite + ESM (通过 esm.sh 加载依赖)
- **样式系统**: Tailwind CSS + 自定义 CSS (`app/style.css`)
- **数据可视化**: Recharts (响应式 SVG 图表)
- **AI 集成**: Google GenAI SDK (Gemini 3 Flash)
- **PWA 支持**: Vite PWA Plugin (离线缓存, 安装到主屏幕)
- **国际化**: 模块化 i18n 方案 (按语言拆分文件，支持 10 种语言)

## 3. 数据架构
为了保证可维护性和扩展性，数据层采用了**分离式架构**：
- **数据源分离**: 
  - `lib/data-silicon.ts`: 存放 Apple Silicon (M系列) 机型。
  - `lib/data-intel.ts`: 存放 Legacy Intel 机型 (2010-2020)。
  - `lib/data-reference.ts`: 存放 PC/GPU 参考硬件 (如 RTX 4090, i9-14900K)。
  - `lib/data.ts`: 作为统一聚合出口。
- **国际化数据**:
  - `lib/locales/*.ts`: 存放各语言 (en, zh, es, etc.) 的独立翻译文件。
  - `lib/translations.ts`: 聚合所有语言包并提供 Context Provider。
- **逻辑分离**: 评分算法与辅助函数独立于 `lib/scoring.ts`。
- **类型定义**: 统一在 `lib/types.ts`。

## 4. 核心功能模块

### 4.1 性能排行榜 (Leaderboard)
- **展示形式**: 响应式数据表格。
- **交互**: 
  - 支持按“综合评分”、“价格”、“年份”排序。
  - 支持按“设备类型” (Laptop/Desktop/Tablet) 和 “芯片家族” (M1-M4/Intel) 过滤。
  - **PC 参照系**: 支持一键混入 PC 顶级硬件数据作为性能锚点。
  - **冻结列**: 移动端横向滚动时，机型名称列固定在左侧，保持上下文。
  - 点击行弹出详情模态框。
- **对比选择**: 提供勾选框，允许用户选择最多 2 款机型进行对比。

### 4.2 对比模式 (Comparison Mode)
- **触发**: 选中 2 款机型后，通过底部悬浮栏进入。
- **视图**: `CompareModal` 组件。
- **功能**:
  - **五维雷达图**: 可视化对比 Single-Core, Multi-Core, Metal, Value (性价比), Memory (最大内存)。
  - **详细条形图**: 针对各项跑分生成对比进度条。
  - **参数对齐**: 并排展示 CPU/GPU 核心、内存、发布年份等。
  - **差异高亮**: 自动计算数值差异百分比 (如 "+25%")。

### 4.3 交互式图表 (Charts)
- **视图**: `PerformanceChart` 组件。
- **模式切换**:
  - **Top Index**: 综合性能垂直条形图 (Top 15)。
  - **Single/Multi/Metal**: 单项性能排行。
  - **Value (Scatter)**: 散点图 (X轴=价格, Y轴=性能)，用于寻找“性价比甜点”。
  - **Points/$**: 每美元性能得分排行。
- **参照系**: 图表中也会显示开启的 PC 参照硬件，使用灰色条/点区分。

### 4.4 AI 智能顾问 (Mac Advisor)
- **视图**: `AIChat` 悬浮组件。
- **能力**: 基于当前数据库 answering technical questions。
- **上下文**: 动态注入 Top 40 最相关机型的规格数据到 System Prompt。
- **特性**: 支持 Markdown 渲染，打字机效果，多语言回复。

## 5. UI/UX 设计规范
- **视觉风格**: Apple Human Interface Guidelines (仿 macOS 风格)。
- **样式文件**: 核心 Tailwind 类与 `app/style.css` (滚动条、字体平滑) 结合。
- **动效**: 使用 Tailwind `animate-in`, `fade-in`, `zoom-in` 实现平滑过渡。
- **响应式**:
  - **Mobile**: 
    - 隐藏非核心列 (CPU/GPU/Price)，保留核心评分。
    - 表格首列 (机型名) 设为 Sticky，防止横向滚动丢失上下文。
  - **Desktop**: 展示完整数据列，图表布局优化。
- **深色模式**: 基于 `class="dark"` 的手动/自动切换，颜色板适配 Gray-50/Gray-900。

## 6. 开发规范
- **组件原子化**: 所有 UI 组件存放在 `components/` 目录。
- **服务隔离**: AI 调用逻辑封装在 `services/geminiService.ts`。
- **无构建依赖**: 依赖项通过 Import Map 指向 CDN，减少 node_modules 体积，便于快速部署和预览。

## 7. 规范文档索引
本项目包含以下详细规范文档：
- [功能详细说明书 (Features)](./features.md)
- [技术栈与架构 (Tech Stack)](./tech_stack.md)
- [数据字典 (Data Dictionary)](./data_dictionary.md)
- [UI 设计规范 (UI Design)](./ui_design.md)
- [项目目录结构 (Directory Structure)](./directory_structure.md)
- [项目路线图 (Roadmap)](./roadmap.md)
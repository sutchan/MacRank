# MacRank 应用规格说明书

## 1. 项目概述
MacRank 是一个针对苹果 Mac 电脑（涵盖 M1-M4 系列及部分 Intel 经典机型）和 iPad Pro/Air 系列的性能排行榜与智能导购助手。它结合了详尽的硬件基准测试数据与 AI 辅助决策系统，帮助用户在复杂的机型中找到最适合自己工作流的设备。

## 2. 技术架构概览
- **核心框架**: React 19
- **构建系统**: 基于浏览器的 ESM (通过 Vite 插件或 esm.sh)
- **样式系统**: Tailwind CSS (通过 CDN 加载，支持深色模式)
- **图标库**: Lucide React
- **图表库**: Recharts
- **AI 集成**: Google GenAI SDK (@google/genai)

## 3. 数据模型

### 3.1 MacModel 接口定义
```typescript
interface MacModel {
  id: string;            // 唯一标识符
  name: string;          // 显示名称
  type: 'Laptop' | 'Desktop' | 'Tablet'; // 设备类型
  chip: string;          // 芯片名称 (如 "M3 Max")
  family: 'M1' | 'M2' | 'M3' | 'M4' | 'Intel'; // 芯片家族
  cores_cpu: string;     // CPU核心描述 (如 "12 (8P+4E)")
  cores_gpu: number;     // GPU核心数
  memory: string;        // 统一内存范围
  releaseYear: number;   // 发布年份
  singleCoreScore: number; // Geekbench 6 单核预估分
  multiCoreScore: number;  // Geekbench 6 多核预估分
  metalScore: number;      // Metal GPU 预估分
  basePriceUSD: number;    // 起售价 (美元)
  description: string;     // 简短描述
}
```

### 3.2 段位评分算法 (Tier Scoring)
综合评分计算公式：
`Composite Score = (SingleCore / 4000 * 35) + (MultiCore / 25000 * 45) + (Metal / 200000 * 20)`

**段位阈值:**
- **S+ (幻神级)**: ≥ 90 分 (紫色渐变)
- **S (顶级)**: ≥ 80 分 (紫色)
- **A+ (次顶级)**: ≥ 70 分 (深蓝)
- **A (优秀)**: ≥ 60 分 (蓝色)
- **B (良好)**: ≥ 45 分 (绿色)
- **C (入门)**: ≥ 30 分 (黄色)
- **D (淘汰)**: < 30 分 (灰色)

## 4. 组件架构

### 4.1 全局容器 (App)
- **状态管理**: 
  - `selectedModel`: 当前选中的详情模型
  - `compareList`: 待对比的模型列表（最多2个）
  - `searchTerm`: 搜索关键词
  - `filterType`: 设备类型过滤 (全部/笔记本/台式机/平板)
  - `filterFamily`: 芯片家族过滤
  - `sortBy`: 排序依据 (分数/价格/年份)
  - `language`: 国际化语言状态
- **职责**: 负责页面整体布局（顶部导航、Hero区域、控制栏），并通过 `useMemo` 计算过滤后的数据 `filteredData`。

### 4.2 核心组件
- **PerformanceChart**: 
  - 使用垂直条形图可视化前 15 名机型的综合得分。
  - 支持 Tooltip 显示具体跑分细节。
- **MacTable**: 
  - 数据展示列表，支持点击查看详情。
  - 集成勾选框用于加入对比列表。
  - 显示段位徽章 (`TierBadge`)。
- **DetailModal**: 
  - 模态框展示单一机型的详细规格。
  - 使用进度条可视化 CPU/GPU 性能在整个产品线中的相对位置。
- **CompareModal**: 
  - 双机型对比视图。
  - 自动计算并高亮各项参数的差异百分比。
  - 包含“综合评分”、“单核”、“多核”、“图形”四个维度的直观对比条。
- **AIChat**: 
  - 悬浮式 AI 聊天窗口。
  - **系统提示词 (System Prompt)**: 扮演专业的 Mac 购买顾问。
  - **上下文注入**: 自动提取并精简 Top 40 相关机型的规格数据注入到 Prompt 中，确保回答基于事实。

## 5. 开发规范

### 5.1 文件结构
*注：项目采用扁平化源码结构以适应特定的运行环境。*
- `components/`: UI 组件库
- `services/`: 外部 API 集成服务
- `lib/`: 
  - `data.ts`: 静态数据源及评分算法
  - `types.ts`: 类型定义
  - `translations.ts`: 多语言字典
- `openspec/`: 项目规格与技术文档

### 5.2 AI 集成规则
- **SDK**: 必须使用 `@google/genai`。
- **API Key**: 仅通过 `process.env.API_KEY` 获取。
- **初始化策略**: 必须在函数调用内部进行**延迟初始化 (Lazy Initialization)**，严禁在模块顶层初始化 SDK，以防止环境变量缺失导致应用崩溃。
- **模型选择**: 统一使用 `gemini-3-flash-preview` 以保证低延迟对话体验。
- **思考配置**: 设置 `thinkingBudget: 0` 关闭长思考模式，优先响应速度。

### 5.3 UI/UX 设计风格
- **设计语言**: 仿 Apple 官网风格（San Francisco 字体，大圆角，磨砂玻璃特效）。
- **配色系统**: 
  - 主色调: 灰色系 (Gray-50 到 Gray-900)
  - 强调色: 蓝色 (#0071E3)
  - 功能色: 紫色 (Pro/Max/Ultra芯片), 绿色 (高性价比/通过验证)
- **响应式**: 必须适配移动端触摸操作（如横向滚动的 Segment Control）。

## 6. 未来规划
- 价格历史追踪曲线。
- 用户真实评价集成。
- 针对特定软件（如 Blender, Final Cut Pro）的性能预估。

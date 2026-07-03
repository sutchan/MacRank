# MacRank - 苹果电脑性能天梯榜 v0.7.8

**中文文档** | [English](./README_zh-CN.md)

**MacRank** 是一个全面的苹果电脑（Mac M1-M5 系列 & iPad A 系列/M 系列）性能排行榜和分级列表。它结合了 Geekbench 6 基准测试数据、性价比分析与 AI 驱动的购买顾问，帮助用户找到最适合自己工作流程的设备。

![MacRank 预览](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20MacBook%20performance%20benchmark%20leaderboard%20dashboard%20with%20clean%20modern%20UI%2C%20dark%20mode%2C%20showing%20M-series%20chips%20comparison%20charts%20and%20ranking%20tables%2C%20purple%20gradient%20accents&image_size=landscape_16_9)

## ✨ 功能特性

- **性能排行榜**: 基于综合分级分数对 MacBook Air、MacBook Pro、iMac、Mac mini、Mac Studio 和 iPad Pro/Air 进行全面排名。
- **场景化评分**: 提供平衡、开发、创作、日常四种加权场景，精准对应不同工作负载。
- **交互式图表**: 使用 Recharts 进行顶级机型可视化对比（综合分数、单核/多核、Metal GPU、性价比散点图）。
- **详细规格**: 深入查看 CPU/GPU 核心数、内存配置、RAM 带宽、显示信息及基准测试分数（Geekbench 6 & Metal）。
- **AI 顾问**: 集成由 **Google Gemini** 驱动的聊天界面（支持 Markdown 渲染与离线兜底），提供购买建议与技术分析。
- **分级系统**: 基于加权综合分数，从 S+（顶级）到 D 级进行可视化 Tier 评级。
- **性价比分析**: 价格 vs 性能散点图与"每 $10 性能得分"图表，直观呈现最优购买选择。
- **机型对比**: 多设备并排对比，突出胜负差距与差异详情。
- **以旧换新计算器**: 评估当前 Mac 的折抵价值，规划升级路径。
- **PC/GPU 参考对照**: 提供 RTX 4090、Ryzen 9 等桌面参考算力对照。
- **状态持久化**: 通过 URL Hash 协议保存搜索、筛选、排序、对比状态，便于分享与书签。
- **深色模式**: 完全响应式 UI，支持自动与手动明暗主题切换。
- **国际化**: 支持 10 种语言（英、中、西、法、德、日、葡、俄、韩、印）。
- **PWA 离线支持**: 可安装为渐进式 Web 应用，提供原生般的离线体验。

## 🛠 技术栈

- **核心框架**: [Next.js 15.5](https://nextjs.org/) (App Router, Edge Runtime)
- **UI 框架**: [React 19](https://react.dev/) + [TypeScript 5.5](https://www.typescriptlang.org/) (strict mode)
- **样式库**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **AI SDK**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini)
- **图表库**: [Recharts](https://recharts.org/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **Markdown 渲染**: [React Markdown](https://remarkjs.github.io/react-markdown/)

## 🚀 快速开始

### 前置要求

- Node.js v20 或更高版本（推荐 LTS）
- npm 10+
- Google Gemini API Key（可在 [Google AI Studio](https://aistudio.google.com/) 免费获取）

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/sutchan/MacRank.git
   cd MacRank
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   在项目根目录下创建一个 `.env` 文件，并添加你的 API Key：
   ```env
   API_KEY=你的_API_KEY_粘贴在这里
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. 打开浏览器访问 `http://localhost:3000`。

### 常用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器（热重载） |
| `npm run build` | 生产构建（输出至 `.next/`） |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint 代码检查 |

## 📂 项目结构

```
macrank/
├── app/
│   ├── api/chat/route.ts      # Gemini AI 聊天接口（Edge Runtime）
│   ├── components/             # UI 组件（懒加载 + React.memo 优化）
│   │   ├── ui/                 # shadcn/ui 基础组件
│   │   ├── AIChat.tsx          # AI 聊天界面（含 Markdown 渲染）
│   │   ├── MacTable.tsx        # 性能天梯表格
│   │   ├── PerformanceChart.tsx # 图表可视化
│   │   ├── DetailModal.tsx     # 机型详情弹窗
│   │   ├── CompareModal.tsx    # 对比弹窗
│   │   └── ...                 # 其他业务组件
│   ├── data/                   # 静态机型数据（silicon/intel/reference）
│   ├── hooks/                  # 自定义 Hooks（useMacData/useSettings/useInteraction）
│   ├── lib/                    # 核心纯函数（scoring/sorting/priceCache/share/urlParams）
│   ├── locales/                # 10 种语言翻译文件 + LanguageContext
│   ├── services/               # API 服务集成（geminiService/priceService）
│   ├── types/                  # TypeScript 类型定义
│   ├── globals.css / style.css # 全局样式（Tailwind CSS 4）
│   ├── layout.tsx              # 根布局（SEO meta、字体、主题脚本）
│   └── page.tsx                # 主页面（状态编排）
├── openspec/                   # 项目规范文档（4 卷 v0.7.8）
│   ├── specification.md        # 总纲
│   ├── 01_core_spec.md         # 核心规格
│   ├── 02_tech_spec.md         # 技术规格
│   ├── 03_dev_standards.md     # 开发规范
│   └── 04_ops_roadmap.md       # 运维与路线图
├── prototype/                  # 原型设计（HTML + UI_DESIGN_SPEC.md）
├── public/                     # 静态资源（icon.svg 等）
├── metadata.json               # PWA 元数据
├── next.config.mjs             # Next.js 配置
├── postcss.config.mjs          # PostCSS 配置（Tailwind CSS 4）
├── tsconfig.json               # TypeScript 配置（strict）
└── package.json
```

## 🔐 安全与性能

本项目在 v0.7.8 引入了多项安全与性能加固：

- **API 提示词注入防护**: `/api/chat` 路由对客户端提交的 `contextData` 字段实施白名单正则校验，并将硬件数据库隔离在 `<HARDWARE_DATABASE>` 标签内，防止指令污染。
- **错误日志脱敏**: 错误日志仅记录 `error.message`，避免泄露请求体或上下文。
- **React.memo 优化**: 关键列表组件（`MacTable`/`MacRow`/`SortHeader`/`ChatMessageBubble`/`FilterMenus`）全部 memo 化。
- **稳定 Key 策略**: 聊天消息使用 `crypto.randomUUID()` 生成稳定 `id`，避免数组索引 key 导致的重渲染。
- **副作用清理**: `useInteraction` 的 toast 定时器在组件卸载时统一清理。
- **文件拆分**: 所有源文件控制在 200 行以内，模块边界清晰。

## 📐 规范文档对齐

项目代码与以下规范文档严格对齐：

- **[openspec/](./openspec/)**: 4 卷标准化规范，定义核心规格、技术规格、开发规范与运维路线图。
- **[prototype/UI_DESIGN_SPEC.md](./prototype/UI_DESIGN_SPEC.md)**: v2.0 设计系统（oklch 色彩、Tier 评级、毛玻璃、动效规范）。
- **[CHANGELOG.md](./CHANGELOG.md)**: 所有版本变更记录。

## 🤝 参与贡献

欢迎提交 Pull Request！

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改（遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范，例如 `feat: add amazing feature`）
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 提交规范

| 类型 | 用途 |
| --- | --- |
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `style` | 格式调整（无逻辑变更） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具链 |

## 📄 许可证

MIT 许可证。详见 `LICENSE` 文件了解更多信息。

---

**声明**: MacRank 使用基于 Geekbench 6 数据的合成分数。价格反映 USD 启动 MSRP。本仓库不隶属于 Apple Inc.

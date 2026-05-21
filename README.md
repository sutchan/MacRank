# MacRank - 苹果电脑性能天梯榜

**中文文档** | [English](./README_zh-CN.md)

**MacRank** 是一个全面的苹果电脑（Mac M1-M5 系列 & iPad A系列/M系列）性能排行榜和分级列表。它结合了基准测试数据和 AI 驱动的购买顾问，帮助用户找到最适合自己工作流程的设备。

![MacRank 预览](https://via.placeholder.com/800x400?text=MacRank+Preview)

## ✨ 功能特性

- **性能排行榜**: 基于综合分级分数对 MacBook Air、MacBook Pro、iMac、Mac mini、Mac Studio 和 iPad Pro 进行全面排名。
- **交互式图表**: 使用 Recharts 进行顶级机型的可视化比较。
- **详细规格**: 深入了解 CPU/GPU 核心数、内存配置和基准测试分数（Geekbench 6 & Metal）。
- **AI 顾问**: 集成由 **Google Gemini 3 Flash** 驱动的聊天界面，回答购买问题并提供技术建议。
- **分级系统**: 基于单核、多核和 GPU 性能的加权综合分数，从 S+（顶级）到 D 级进行可视化排名。
- **深色模式**: 完全响应式 UI，支持自动和手动切换明暗主题。
- **国际化**: 支持 10 种语言（英语、中文、西班牙语、法语、德语、日语、葡萄牙语、俄语、韩语、印地语）。

## 🛠 技术栈

- **核心框架**: [Next.js 15](https://nextjs.org/)
- **样式库**: [Tailwind CSS](https://tailwindcss.com/)
- **AI SDK**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
- **图表库**: [Recharts](https://recharts.org/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **Markdown 渲染**: [React Markdown](https://remarkjs.github.io/react-markdown/)

## 🚀 快速开始

### 前置要求

- Node.js (v18 或更高版本)
- npm 或 yarn
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

## 📂 项目结构

```
macrank/
├── app/
│   ├── components/       # UI 组件（如 MacTable.tsx）
│   ├── data/             # 静态数据文件（如 data-silicon.ts）
│   ├── lib/              # 核心逻辑（如 scoring.ts）
│   ├── locales/          # 语言翻译文件（如 zh.ts）
│   ├── services/         # API 服务集成（如 geminiService.ts）
│   └── style.css         # 全局 CSS 样式
├── public/               # 静态资源（如 icon.svg）
├── openspec/             # 规范文档
├── tailwind.config.js    # Tailwind CSS 配置
├── package.json
└── README.md
```

## 🤝 参与贡献

欢迎提交 Pull Request！

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 许可证

MIT 许可证。详见 `LICENSE` 文件了解更多信息。
# MacRank - 苹果电脑性能天梯榜

**中文文档** | [English](./README.md)

**MacRank** 是一个针对 Apple Silicon (M1-M4 系列) 电脑的综合性能排行榜和天梯图应用。它结合了详尽的基准测试数据与 AI 智能导购助手，帮助用户找到最适合自己工作流的 Mac 电脑。

![MacRank 预览](https://via.placeholder.com/800x400?text=MacRank+Preview)

## ✨ 功能特性

- **性能排行榜**：包含 MacBook Air, Pro, iMac, Mac mini 和 Mac Studio 的综合排名。
- **交互式图表**：使用 Recharts 可视化展示头部机型的性能差距。
- **详细规格**：深入查看 CPU/GPU 核心数、统一内存配置以及 Geekbench 6 和 Metal 的跑分数据。
- **AI 智能顾问**：集成 **Google Gemini 3 Flash** 模型，提供实时的购买建议和技术问答。
- **段位系统**：基于单核、多核和 GPU 性能的加权综合得分，将机型从 S+ (顶尖) 到 D 进行分级。
- **深色模式**：支持自动跟随系统或手动切换深色/浅色主题。
- **多语言支持**：内置 10 种国际化语言支持（中文、英语、日语、德语、法语等）。

## 🛠 技术栈

- **核心框架**: [React 19](https://react.dev/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式库**: [Tailwind CSS](https://tailwindcss.com/)
- **AI SDK**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
- **图表库**: [Recharts](https://recharts.org/)
- **图标库**: [Lucide React](https://lucide.dev/)

## 🚀 快速开始

### 前置要求

- Node.js (v18 或更高版本)
- npm 或 yarn
- Google Gemini API Key (可在 [Google AI Studio](https://aistudio.google.com/) 免费获取)

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/macrank.git
   cd macrank
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

5. 打开浏览器访问 `http://localhost:5173`。

## 📂 项目结构

```
macrank/
├── components/       # UI 组件 (表格, 图表, 聊天窗口, 详情弹窗)
├── lib/             
│   ├── data.ts       # 静态 Mac 机型数据库 (统一入口)
│   ├── translations.ts # 国际化翻译字典
│   └── types.ts      # TypeScript 类型定义
├── services/         # API 服务集成 (Gemini AI)
├── App.tsx           # 主应用逻辑
├── index.tsx         # 入口文件
└── index.html        # HTML 模板
```

## 🤝 参与贡献

欢迎提交 Pull Request！

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目基于 MIT 许可证分发。详情请参阅 `LICENSE` 文件。
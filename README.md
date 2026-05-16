# MacRank - 苹果电脑性能天梯榜

**中文文档** | [English](./README_zh-CN.md)

**MacRank** is a comprehensive performance leaderboard and tier list for Apple computers (Mac M1-M5 series & iPad A-series/M-series). It combines benchmark data with an AI-powered purchasing advisor to help users find the perfect device for their workflow.

![MacRank 预览](https://via.placeholder.com/800x400?text=MacRank+Preview)

## ✨ 功能特性

- **Performance Leaderboard**: comprehensive ranking of MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio, and iPad Pro based on synthetic tier scores.
- **Interactive Charts**: Visual comparison of top models using Recharts.
- **Detailed Specs**: Deep dive into CPU/GPU cores, memory configurations, and benchmark scores (Geekbench 6 & Metal).
- **AI Advisor**: Integrated chat interface powered by **Google Gemini 3 Flash** to answer buying questions and provide technical advice.
- **Tier System**: Visual ranking from S+ (Top Tier) to D, based on a weighted composite score of Single-Core, Multi-Core, and GPU performance.
- **Dark Mode**: Fully responsive UI with automatic and manual light/dark theme switching.
- **Internationalization**: Support for 10 languages (English, Chinese, Spanish, French, German, Japanese, Portuguese, Russian, Korean, Hindi).

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
- Google Gemini API Key (可在 [Google AI Studio](https://aistudio.google.com/) 免费获取)

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
│   ├── components/       # UI Components (e.g., MacTable.tsx)
│   ├── data/             # Static data files (e.g., data-silicon.ts)
│   ├── lib/              # Core logic (e.g., scoring.ts)
│   ├── locales/          # Language translation files (e.g., en.ts)
│   ├── services/         # API integrations (e.g., geminiService.ts)
│   └── style.css         # Global CSS styles
├── public/               # Static assets (e.g., icon.svg)
├── openspec/             # Specification documents
├── tailwind.config.js    # Tailwind CSS configuration
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

Distributed under the MIT License. See `LICENSE` for more information.

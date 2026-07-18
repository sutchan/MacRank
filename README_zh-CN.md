# MacRank - Apple Silicon Performance Leaderboard

[中文文档](./README.md) | **English**

**MacRank** is a comprehensive performance leaderboard and tier list for Apple Mac computers (M1-M5 series). It combines benchmark data with an AI-powered purchasing advisor to help users find the perfect Mac for their workflow.

![MacRank Preview](https://via.placeholder.com/800x400?text=MacRank+Preview)

## ✨ Features

- **Performance Leaderboard**: comprehensive ranking of MacBook Air, MacBook Pro, iMac, Mac mini, and Mac Studio based on synthetic tier scores.
- **Interactive Charts**: Visual comparison of top models using Recharts.
- **Detailed Specs**: Deep dive into CPU/GPU cores, memory configurations, and benchmark scores (Geekbench 6 & Metal).
- **AI Advisor**: Integrated chat interface powered by **Google Gemini 3 Flash** to answer buying questions and provide technical advice.
- **Tier System**: Visual ranking from S+ (Top Tier) to D, based on a weighted composite score of Single-Core, Multi-Core, and GPU performance.
- **Design System**: Apple-inspired minimalist design system built on shadcn/ui with oklch color tokens, dark mode, and `prefers-reduced-motion` support.
- **Dark Mode**: Fully responsive UI with automatic and manual light/dark theme switching.
- **Internationalization**: Support for 10 languages (English, Chinese, Spanish, French, German, Japanese, Portuguese, Russian, Korean, Hindi).

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (oklch color tokens)
- **Style Utilities**: [class-variance-authority](https://cva.style/) + clsx + tailwind-merge
- **AI SDK**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: [React Markdown](https://remarkjs.github.io/react-markdown/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key (Get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sutchan/MacRank.git
   cd MacRank
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Google Gemini API Key:
   ```env
   API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

```
macrank/
├── app/
│   ├── components/       # UI 组件 (如 MacTable.tsx)
│   ├── data/             # 硬件参数等静态数据 (如 data-silicon.ts)
│   ├── lib/              # 核心逻辑 (如 scoring.ts)
│   ├── locales/          # 国际化语言包 (如 zh.ts)
│   ├── services/         # API 服务集成 (如 geminiService.ts)
│   └── style.css         # 全局样式
├── public/               # 静态资源 (如 icon.svg)
├── openspec/             # 项目规范文档
├── tailwind.config.js    # Tailwind 配置
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

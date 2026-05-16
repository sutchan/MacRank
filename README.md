# MacRank - Apple Silicon Performance Leaderboard

[中文文档](./README_zh-CN.md) | **English**

**MacRank** is a comprehensive performance leaderboard and tier list for Apple Mac computers (M1-M4 series). It combines benchmark data with an AI-powered purchasing advisor to help users find the perfect Mac for their workflow.

![MacRank Preview](https://via.placeholder.com/800x400?text=MacRank+Preview)

## ✨ Features

- **Performance Leaderboard**: Comprehensive ranking of MacBook Air, MacBook Pro, iMac, Mac mini, and Mac Studio based on synthetic tier scores.
- **Interactive Charts**: Visual comparison of top models using Recharts.
- **Detailed Specs**: Deep dive into CPU/GPU cores, memory configurations, and benchmark scores (Geekbench 6 & Metal).
- **AI Advisor**: Integrated chat interface powered by **Google Gemini 3 Flash** to answer buying questions and provide technical advice.
- **Tier System**: Visual ranking from S+ (Top Tier) to D, based on a weighted composite score of Single-Core, Multi-Core, and GPU performance.
- **Dark Mode**: Fully responsive UI with automatic and manual light/dark theme switching.
- **Internationalization**: Support for 10 languages (English, Chinese, Spanish, French, German, Japanese, Portuguese, Russian, Korean, Hindi).
- **PWA Support**: Installable as a standalone app with offline caching capabilities.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI SDK**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

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
MacRank/
├── app/                      # Next.js App Router
│   ├── components/           # UI Components
│   │   ├── AIChat.tsx        # AI Chat Widget
│   │   ├── CompareModal.tsx  # Model Comparison Modal
│   │   ├── DetailModal.tsx   # Model Detail View
│   │   ├── FilterControls.tsx # Filter & Search Controls
│   │   ├── Footer.tsx        # Footer Component
│   │   ├── Header.tsx        # Navigation Header
│   │   ├── Hero.tsx          # Hero Section
│   │   ├── MacTable.tsx      # Performance Table
│   │   ├── PerformanceChart.tsx # Performance Charts
│   │   ├── SettingsModal.tsx # Settings Modal
│   │   └── TierBadge.tsx     # Tier Badge Component
│   ├── lib/                  # Core Logic
│   │   ├── locales/          # i18n Translation Files (10 languages)
│   │   ├── data.ts           # Data Aggregation Entry
│   │   ├── data-silicon.ts   # Apple Silicon Models Data
│   │   ├── data-intel.ts     # Intel Models Data
│   │   ├── data-reference.ts # PC Reference Hardware Data
│   │   ├── scoring.ts        # Tier Scoring Logic
│   │   ├── translations.ts   # i18n Configuration
│   │   ├── share.ts          # Web Share API Helper
│   │   └── types.ts          # TypeScript Type Definitions
│   ├── globals.css           # Global Styles
│   ├── layout.tsx            # Root Layout
│   ├── page.tsx              # Main Page
│   └── style.css             # Custom Styles
├── services/                 # External API Services
│   └── geminiService.ts      # Google Gemini AI Integration
├── public/                    # Static Assets
│   ├── icon.svg              # App Icon
│   └── manifest.json         # PWA Manifest
├── openspec/                  # Project Documentation (OpenSpec)
├── next.config.ts             # Next.js Configuration
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind CSS Configuration
└── tsconfig.json              # TypeScript Configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

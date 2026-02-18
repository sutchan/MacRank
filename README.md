# MacRank - Apple Silicon Performance Leaderboard

[中文文档](./README_zh-CN.md) | **English**

**MacRank** is a comprehensive performance leaderboard and tier list for Apple Mac computers (M1-M5 series). It combines benchmark data with an AI-powered purchasing advisor to help users find the perfect Mac for their workflow.

![MacRank Preview](https://via.placeholder.com/800x400?text=MacRank+Preview)

## ✨ Features

- **Performance Leaderboard**: comprehensive ranking of MacBook Air, MacBook Pro, iMac, Mac mini, and Mac Studio based on synthetic tier scores.
- **Interactive Charts**: Visual comparison of top models using Recharts.
- **Detailed Specs**: Deep dive into CPU/GPU cores, memory configurations, and benchmark scores (Geekbench 6 & Metal).
- **AI Advisor**: Integrated chat interface powered by **Google Gemini 3 Flash** to answer buying questions and provide technical advice.
- **Tier System**: Visual ranking from S+ (Top Tier) to D, based on a weighted composite score of Single-Core, Multi-Core, and GPU performance.
- **Dark Mode**: Fully responsive UI with automatic and manual light/dark theme switching.
- **Internationalization**: Support for 10 languages (English, Chinese, Spanish, French, German, Japanese, Portuguese, Russian, Korean, Hindi).

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
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

5. Open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure

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
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
├── tailwind.config.js    # Tailwind CSS configuration
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

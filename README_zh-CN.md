# MacRank - Apple Silicon Performance Leaderboard v0.7.8

[中文文档](./README.md) | **English**

**MacRank** is a comprehensive performance leaderboard and tier list for Apple Mac computers (M1-M5 series & iPad A-series/M-series). It combines Geekbench 6 benchmark data, value-for-money analysis, and an AI-powered purchasing advisor to help users find the perfect device for their workflow.

![MacRank Preview](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20MacBook%20performance%20benchmark%20leaderboard%20dashboard%20with%20clean%20modern%20UI%2C%20dark%20mode%2C%20showing%20M-series%20chips%20comparison%20charts%20and%20ranking%20tables%2C%20purple%20gradient%20accents&image_size=landscape_16_9)

## ✨ Features

- **Performance Leaderboard**: Comprehensive ranking of MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio, and iPad Pro/Air based on synthetic tier scores.
- **Scenario-based Scoring**: Four weighted scenarios (Balanced, Developer, Creative, Daily) tailored to different workloads.
- **Interactive Charts**: Visual comparison of top models using Recharts (composite, single/multi-core, Metal GPU, value scatter plots).
- **Detailed Specs**: Deep dive into CPU/GPU cores, memory configurations, RAM bandwidth, display info, and benchmark scores (Geekbench 6 & Metal).
- **AI Advisor**: Integrated chat interface powered by **Google Gemini** (with Markdown rendering and offline fallback) for buying advice and technical analysis.
- **Tier System**: Visual ranking from S+ (Top Tier) to D, based on a weighted composite score of Single-Core, Multi-Core, and GPU performance.
- **Value Analysis**: Price vs Performance scatter plot and "score per $10" chart to surface the best buys.
- **Model Comparison**: Side-by-side device comparison highlighting winners and deltas.
- **Trade-in Calculator**: Estimate your current Mac's trade-in value and plan upgrade paths.
- **PC/GPU Reference**: Compare against desktop reference compute (RTX 4090, Ryzen 9, etc.).
- **State Persistence**: URL Hash protocol persists search, filter, sort, and compare state for sharing and bookmarking.
- **Dark Mode**: Fully responsive UI with automatic and manual light/dark theme switching.
- **Internationalization**: Support for 10 languages (English, Chinese, Spanish, French, German, Japanese, Portuguese, Russian, Korean, Hindi).
- **PWA Offline Support**: Installable as a Progressive Web App for a native-like offline experience.

## 🛠 Tech Stack

- **Framework**: [Next.js 15.5](https://nextjs.org/) (App Router, Edge Runtime)
- **UI**: [React 19](https://react.dev/) + [TypeScript 5.5](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **AI SDK**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: [React Markdown](https://remarkjs.github.io/react-markdown/)

## 🚀 Getting Started

### Prerequisites

- Node.js v20 or higher (LTS recommended)
- npm 10+
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

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Production build (output to `.next/`) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## 📂 Project Structure

```
macrank/
├── app/
│   ├── api/chat/route.ts      # Gemini AI chat endpoint (Edge Runtime)
│   ├── components/             # UI components (lazy-loaded + React.memo)
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── AIChat.tsx          # AI chat interface (Markdown rendering)
│   │   ├── MacTable.tsx        # Performance ladder table
│   │   ├── PerformanceChart.tsx # Chart visualizations
│   │   ├── DetailModal.tsx     # Model detail modal
│   │   ├── CompareModal.tsx    # Comparison modal
│   │   └── ...                 # Other business components
│   ├── data/                   # Static model data (silicon/intel/reference)
│   ├── hooks/                  # Custom hooks (useMacData/useSettings/useInteraction)
│   ├── lib/                    # Core pure functions (scoring/sorting/priceCache/share/urlParams)
│   ├── locales/                # 10 language translation files + LanguageContext
│   ├── services/               # API service integrations (geminiService/priceService)
│   ├── types/                  # TypeScript type definitions
│   ├── globals.css / style.css # Global styles (Tailwind CSS 4)
│   ├── layout.tsx              # Root layout (SEO meta, fonts, theme script)
│   └── page.tsx                # Main page (state orchestration)
├── openspec/                   # Project specs (4 volumes v0.7.8)
│   ├── specification.md        # Master index
│   ├── 01_core_spec.md         # Core spec
│   ├── 02_tech_spec.md         # Technical spec
│   ├── 03_dev_standards.md     # Development standards
│   └── 04_ops_roadmap.md       # Operations & roadmap
├── prototype/                  # Prototype design (HTML + UI_DESIGN_SPEC.md)
├── public/                     # Static assets (icon.svg, etc.)
├── metadata.json               # PWA metadata
├── next.config.mjs             # Next.js config
├── postcss.config.mjs          # PostCSS config (Tailwind CSS 4)
├── tsconfig.json               # TypeScript config (strict)
└── package.json
```

## 🔐 Security & Performance

This project introduced several security and performance hardening improvements in v0.7.8:

- **API Prompt Injection Defense**: The `/api/chat` route applies whitelist regex validation to client-submitted `contextData` fields and isolates the hardware database inside `<HARDWARE_DATABASE>` tags to prevent instruction pollution.
- **Log Sanitization**: Error logs only record `error.message`, avoiding leakage of request bodies or context.
- **React.memo Optimization**: Key list components (`MacTable`/`MacRow`/`SortHeader`/`ChatMessageBubble`/`FilterMenus`) are all memoized.
- **Stable Keys**: Chat messages use `crypto.randomUUID()` for stable `id`s, avoiding array-index re-renders.
- **Side-effect Cleanup**: `useInteraction`'s toast timers are cleared on unmount.
- **File Splitting**: All source files are kept under 200 lines with clear module boundaries.

## 📐 Spec Alignment

Project code is strictly aligned with the following specs:

- **[openspec/](./openspec/)**: 4-volume standardized specs covering core, technical, dev standards, and ops roadmap.
- **[prototype/UI_DESIGN_SPEC.md](./prototype/UI_DESIGN_SPEC.md)**: v2.0 design system (oklch colors, tier ratings, glassmorphism, motion specs).
- **[CHANGELOG.md](./CHANGELOG.md)**: All version change records.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (follow [Conventional Commits](https://www.conventionalcommits.org/), e.g. `feat: add amazing feature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Conventions

| Type | Purpose |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting (no logic changes) |
| `refactor` | Refactoring |
| `perf` | Performance improvement |
| `test` | Test-related |
| `chore` | Build/toolchain |

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Disclaimer**: MacRank uses synthetic scores based on Geekbench 6 data. Prices reflect USD launch MSRP. This repository is not affiliated with Apple Inc.

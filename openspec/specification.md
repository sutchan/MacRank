# MacRank Application Specification

## 1. Project Overview
MacRank is a performance leaderboard and purchasing advisor for Apple Silicon computers (M1-M4 series). It combines hard benchmark data with AI-assisted decision making to help users find the right Mac.

## 2. Technical Architecture
- **Framework**: React 19
- **Build System**: ESM (in-browser)
- **Styling**: Tailwind CSS via CDN
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI Integration**: Google GenAI SDK (@google/genai)

## 3. Data Model

### 3.1 MacModel Interface
```typescript
interface MacModel {
  id: string;
  name: string;
  type: 'Laptop' | 'Desktop';
  chip: string;
  family: 'M1' | 'M2' | 'M3' | 'M4' | 'Intel';
  cores_cpu: string;
  cores_gpu: number;
  memory: string;
  releaseYear: number;
  singleCoreScore: number;
  multiCoreScore: number;
  metalScore: number;
  basePriceUSD: number;
  description: string;
}
```

### 3.2 Tier Scoring Logic
Composite Score = `(SingleCore / 4000 * 35) + (MultiCore / 25000 * 45) + (Metal / 200000 * 20)`

**Tier Thresholds:**
- **S+**: > 90
- **S**: > 80
- **A+**: > 70
- **A**: > 60
- **B**: > 45
- **C**: > 30
- **D**: < 30

## 4. Component Architecture

### 4.1 App (Root)
- Manages global state: `selectedModel`, `searchTerm`, `filterType`, `filterFamily`, `sortBy`.
- Computes `filteredData` using `useMemo`.
- Orchestrates layout: Header, Intro, Charts, Controls, Table.

### 4.2 Core Components
- **PerformanceChart**: Vertical bar chart visualizing top 15 models by composite score.
- **MacTable**: Sortable, filterable list of models with rank badges.
- **DetailModal**: Detailed specification view with relative performance bars.
- **AIChat**: Floating chat widget powered by Gemini 3 Flash.
    - **System Prompt**: Specialized as a Mac purchasing advisor.
    - **Context**: Injects summarized top 20 model specs into the prompt.

## 5. Development Guidelines

### 5.1 File Structure
*Note: Project uses a flat root structure for source files per environment constraints.*
- `components/`: UI components.
- `services/`: API integration services.
- `data.ts`: Static data source.
- `types.ts`: Shared type definitions.
- `openspec/`: Project specifications and documentation.

### 5.2 AI Integration Rules
- Use `@google/genai` SDK.
- API Key must be obtained exclusively from `process.env.API_KEY`.
- Model: `gemini-3-flash-preview` for low-latency chat interactions.
- Disable thinking (`thinkingBudget: 0`) for conversational responsiveness.

### 5.3 Styling
- Use utility-first Tailwind CSS classes.
- Primary Colors: Blue (Intel/General), Purple (Pro/Max/Ultra), Green (Verified/Value).
- Font: Inter (Google Fonts).

## 6. Future Roadmap
- Compare view (Side-by-side).
- Price history tracking.
- User reviews integration.

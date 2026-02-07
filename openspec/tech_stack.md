# Technical Framework & Technology Stack

## 1. Core Framework
*   **Library**: React 19
*   **Language**: TypeScript (TSX)
*   **Module System**: ES Modules (ESM)
    *   *Reasoning*: The application runs directly in the browser using native ES modules imported via `esm.sh`. This eliminates the need for complex build steps (Webpack/Vite) within the current execution environment, allowing for rapid prototyping and live previews.

## 2. User Interface (UI) & Styling
*   **CSS Framework**: Tailwind CSS (v3.4)
    *   *Implementation*: Loaded via CDN (`cdn.tailwindcss.com`).
    *   *Reasoning*: Utility-first approach allows for rapid UI development without writing custom CSS files. Supports responsive design and consistent theming out-of-the-box.
*   **Icons**: Lucide React
    *   *Reasoning*: Lightweight, consistent, and highly customizable SVG icons that integrate seamlessly with React.
*   **Typography**: Inter (Google Fonts)
    *   *Reasoning*: Clean, modern sans-serif font that mirrors the Apple ecosystem aesthetic.

## 3. Data Visualization
*   **Library**: Recharts
    *   *Reasoning*: Built specifically for React with a declarative component-based API. It handles SVG rendering efficiently and supports responsive container sizing, essential for the performance charts.

## 4. Artificial Intelligence (AI)
*   **SDK**: `@google/genai` (Google GenAI SDK)
*   **Model**: `gemini-3-flash-preview`
*   **Integration Pattern**:
    *   **Direct API Calls**: The client communicates directly with the Gemini API.
    *   **Context Injection**: Application state (Mac models, prices, benchmark scores) is serialized and injected into the system prompt to ground the AI's responses in factual data.
    *   **Latency Optimization**: Thinking budget is set to `0` to ensure conversational responsiveness.

## 5. State Management
*   **Approach**: React Native Hooks (`useState`, `useMemo`, `useEffect`)
    *   *Reasoning*: The application state is relatively flat (list of models, filter criteria, chat history). Complex state management libraries (Redux/Zustand) are unnecessary overhead for this scope. `useMemo` is heavily used to optimize sorting and filtering of the dataset.

## 6. Dependency Map (Import Map)
The application relies on the following ESM imports defined in `index.html`:

| Package | Source | Version | Usage |
| :--- | :--- | :--- | :--- |
| `react` | esm.sh | ^19.2.4 | UI Core |
| `react-dom` | esm.sh | ^19.2.4 | DOM Rendering |
| `@google/genai` | esm.sh | ^1.40.0 | AI Logic |
| `lucide-react` | esm.sh | ^0.563.0 | Icons |
| `recharts` | esm.sh | ^3.7.0 | Charts |

## 7. Performance & Optimization
*   **Lazy Loading**: Not currently implemented (single page).
*   **Memoization**: Filter logic is memoized to prevent recalculation on every render.
*   **Assets**: No local binary assets; all resources are code-generated or CDN-hosted.

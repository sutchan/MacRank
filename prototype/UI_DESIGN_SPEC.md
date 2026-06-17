# MacRank v0.7.6 设计系统规范

## 文档信息
- **版本**: v2.0
- **更新日期**: 2026-06-16
- **状态**: 完整设计系统已定义
- **框架**: shadcn/ui (radix-nova) + Tailwind CSS 4 + Next.js 15

---

# 第一部分：设计系统规范

## 1.1 色彩规范 (Color System)

### 1.1.1 语义化颜色变量

MacRank 使用 oklch 色彩空间确保跨设备一致性。

```css
/* Light Mode */
:root {
  /* 基础色 */
  --background: oklch(1 0 0);           /* #FFFFFF - 页面背景 */
  --foreground: oklch(0.145 0 0);       /* #1C1C1E - 主文本 */
  
  /* 卡片色 */
  --card: oklch(1 0 0);                /* 卡片背景 */
  --card-foreground: oklch(0.145 0 0); /* 卡片文本 */
  
  /* 弹出层 */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  
  /* 主色调 */
  --primary: oklch(0.205 0 0);         /* Apple Gray - 按钮/强调 */
  --primary-foreground: oklch(0.985 0 0);
  
  /* 次要色 */
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  
  /* 静音色 */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0); /* #6B7280 */
  
  /* 强调色 */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  
  /* 危险/错误 */
  --destructive: oklch(0.577 0.245 27.325); /* #DC2626 */
  
  /* 边框与输入 */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  
  /* 图表色 */
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
}

/* Dark Mode */
.dark {
  --background: oklch(0.145 0 0);       /* #1C1C1E */
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}
```

### 1.1.2 Apple 品牌色

```css
:root {
  --color-apple-blue: #0071E3;     /* Apple 官方蓝 */
  --color-apple-gray-50: #F5F5F7;  /* 浅灰背景 */
  --color-apple-gray-100: #E5E5EA;
  --color-apple-gray-200: #D1D1D6;
  --color-apple-gray-300: #C7C7CC;
  --color-apple-gray-400: #AEAEB2;
  --color-apple-gray-500: #8E8E93;
  --color-apple-gray-600: #636366;
  --color-apple-gray-700: #48484A;
  --color-apple-gray-800: #3A3A3C;
  --color-apple-gray-900: #1C1C1E;
  --color-apple-gray-950: #000000;
}
```

### 1.1.3 状态颜色

```css
:root {
  /* 成功 */
  --color-success: #34C759;
  --color-success-light: #E8F9ED;
  
  /* 警告 */
  --color-warning: #FF9500;
  --color-warning-light: #FFF4E5;
  
  /* 错误 */
  --color-error: #FF3B30;
  --color-error-light: #FFEBEA;
  
  /* 信息 */
  --color-info: #007AFF;
  --color-info-light: #E5F1FF;
}
```

### 1.1.4 Tier 评级颜色系统

```css
/* S+ 级 - 幻彩渐变 + 发光动画 */
.tier-s-plus {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  animation: tier-glow 2s ease-in-out infinite alternate;
}

@keyframes tier-glow {
  0% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.3); }
  100% { box-shadow: 0 0 25px rgba(236, 72, 153, 0.5); }
}

/* S 级 - 紫色渐变 */
.tier-s {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

/* A 级 - 蓝色渐变 */
.tier-a {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* B 级 - 绿色渐变 */
.tier-b {
  background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

/* C 级 - 黄色渐变 */
.tier-c {
  background: linear-gradient(135deg, #eab308 0%, #facc15 100%);
  box-shadow: 0 4px 12px rgba(234, 179, 8, 0.3);
}

/* D 级 - 灰色渐变 */
.tier-d {
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}
```

### 1.1.5 毛玻璃效果

```css
.glass-panel {
  backdrop-filter: blur(24px);
  background-color: rgba(255, 255, 255, 0.7);
  border-color: rgba(229, 231, 235, 0.5);
}

.dark .glass-panel {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(31, 41, 55, 0.5);
}
```

### 1.1.6 颜色对比度要求

| 文本类型 | 最小对比度 | 适用场景 |
|---------|-----------|---------|
| AAA (7:1) | 正文文本 | 主要内容 |
| AA (4.5:1) | 大文本 | 标题、副标题 |
| AA Large (3:1) | 大文本 (18px+) | 按钮、链接 |
| UI (3:1) | UI 组件 | 边框、图标 |

---

## 1.2 字体规范 (Typography)

### 1.2.1 字体栈

```css
/* 正文字体 - Apple San Francisco */
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;

/* 等宽字体 - 用于代码/数字 */
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;

/* 中文回退 */
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif;
```

### 1.2.2 字号系统

```css
/* 使用 clamp() 实现响应式字号 */
--text-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);  /* 40px - 72px */
--text-h1: clamp(2rem, 4vw + 0.5rem, 3rem);     /* 32px - 48px */
--text-h2: clamp(1.5rem, 3vw + 0.25rem, 2rem);  /* 24px - 32px */
--text-h3: clamp(1.25rem, 2vw, 1.5rem);         /* 20px - 24px */
--text-body: 1rem;                               /* 16px */
--text-small: 0.875rem;                          /* 14px */
--text-xs: 0.75rem;                              /* 12px */
--text-2xs: 0.625rem;                            /* 10px */

/* 具体应用 */
.text-hero { font-size: var(--text-hero); }
.text-h1 { font-size: var(--text-h1); }
.text-h2 { font-size: var(--text-h2); }
.text-h3 { font-size: var(--text-h3); }
.text-body { font-size: var(--text-body); }
.text-small { font-size: var(--text-small); }
.text-xs { font-size: var(--text-xs); }
```

### 1.2.3 字重系统

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;

/* 使用场景 */
font-weight: 400;   /* 正文 */
font-weight: 500;   /* 次要文本 */
font-weight: 600;   /* 按钮、标签 */
font-weight: 700;   /* 标题 */
font-weight: 800;   /* 强调标题 */
font-weight: 900;   /* Hero 标题 */
```

### 1.2.4 行高与间距

```css
/* 行高 */
--leading-none: 1;      /* 紧凑 */
--leading-tight: 1.25; /* 标题 */
--leading-snug: 1.375; /* 次级标题 */
--leading-normal: 1.5; /* 正文 */
--leading-relaxed: 1.625; /* 宽松阅读 */
--leading-loose: 2;     /* 装饰文本 */

/* 字间距 */
--tracking-tighter: -0.05em; /* 超大标题 */
--tracking-tight: -0.025em;  /* 大标题 */
--tracking-normal: 0em;       /* 正文 */
--tracking-wide: 0.025em;    /* 大写文本 */
--tracking-wider: 0.05em;    /* 标签 */
--tracking-widest: 0.1em;   /* 超大写 */

/* 段落间距 */
--paragraph-spacing-tight: 0.5rem;
--paragraph-spacing-normal: 1rem;
--paragraph-spacing-relaxed: 1.5rem;
```

### 1.2.5 数字显示

```css
/* 等宽数字 - 用于对齐 */
font-feature-settings: "tnum";  /* Tabular nums */

/* 分数 */
font-feature-settings: "frac";  /* 1/2 → ½ */

/* 应用 */
.tabular-nums {
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
```

---

## 1.3 间距与布局规范 (Spacing & Layout)

### 1.3.1 间距系统

基于 4px 网格系统。

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}

/* 组件内间距 */
--padding-button: 0.625rem 1.25rem;  /* 10px 20px */
--padding-input: 0.5rem 0.75rem;     /* 8px 12px */
--padding-card: 1.5rem;             /* 24px */
--padding-modal: 1.5rem;             /* 24px */
```

### 1.3.2 容器宽度

```css
:root {
  /* 标准容器 */
  --container-xs: 320px;
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* MacRank 主容器 */
  --container-main: 980px;
}

/* 应用 */
.container-main {
  max-width: var(--container-main);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-main {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

### 1.3.3 响应式断点

```css
/* 移动端优先断点 */
/* Base: 0-639px (Mobile) */
/* sm: 640px+ (Large Mobile) */
/* md: 768px+ (Tablet) */
/* lg: 1024px+ (Desktop) */
/* xl: 1280px+ (Large Desktop) */
/* 2xl: 1536px+ (Extra Large) */

/* Tailwind 断点 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### 1.3.4 栅格系统

```css
/* 12 列栅格 */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

/* 常用布局 */
.layout-sidebar { grid-template-columns: 280px 1fr; }
.layout-card-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
.layout-features { grid-template-columns: repeat(3, 1fr); }

/* 响应式 */
@media (max-width: 768px) {
  .layout-sidebar { grid-template-columns: 1fr; }
  .layout-features { grid-template-columns: 1fr; }
}
```

### 1.3.5 堆叠间距 (替代 space-y-*)

shadcn/ui 规范要求使用 flex + gap，禁止使用 space-y-* 或 space-x-*。

```tsx
// ✅ 正确 - 使用 flex + gap
<div className="flex flex-col gap-4">
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</div>

// ❌ 错误 - 使用 space-y-*
<div className="space-y-4">
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</div>

// ✅ 正确 - 水平间距
<div className="flex items-center gap-4">
  <Button>Action</Button>
  <Button>Cancel</Button>
</div>
```

---

## 1.4 图标规范 (Icon)

### 1.4.1 图标库

MacRank 使用 **Lucide React** 作为图标库。

```tsx
import { Search, Share2, Settings, Menu, X, ChevronDown } from "lucide-react";
```

### 1.4.2 图标尺寸规范

```css
/* 图标尺寸 */
--icon-xs: 12px;   /* 4 */
--icon-sm: 16px;  /* 5 */
--icon-md: 20px;  /* 6 */
--icon-lg: 24px;  /* 7 */
--icon-xl: 32px;  /* 8 */
--icon-2xl: 48px; /* 10 */

/* 使用 size-* 而非 w-* h-* */
.size-4 { width: 1rem; height: 1rem; }    /* 16px */
.size-5 { width: 1.25rem; height: 1.25rem; }  /* 20px */
.size-6 { width: 1.5rem; height: 1.5rem; }     /* 24px */
.size-8 { width: 2rem; height: 2rem; }          /* 32px */
```

### 1.4.3 图标在按钮中的使用

shadcn/ui 规范要求使用 `data-icon` 属性。

```tsx
// ✅ 正确 - 使用 data-icon
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

// ❌ 错误 - 直接设置 icon 样式
<Button>
  <SearchIcon className="mr-2 h-4 w-4" />
  Search
</Button>

// ✅ 图标按钮
<Button aria-label="Search">
  <SearchIcon />
</Button>
```

### 1.4.4 图标颜色

```css
/* 图标默认颜色 */
.icon-default { color: var(--muted-foreground); }

/* 图标悬停 */
.icon-hover { color: var(--foreground); }

/* 状态图标 */
.icon-success { color: var(--color-success); }
.icon-warning { color: var(--color-warning); }
.icon-error { color: var(--color-error); }
```

### 1.4.5 常用图标映射

| 功能 | Lucide Icon |
|-----|-------------|
| 搜索 | `Search` |
| 分享 | `Share2` |
| 设置 | `Settings` |
| 菜单 | `Menu` |
| 关闭 | `X` |
| 下拉 | `ChevronDown` |
| 箭头右 | `ArrowRight` |
| 箭头左 | `ArrowLeft` |
| 勾选 | `Check` |
| 警告 | `AlertTriangle` |
| 信息 | `Info` |
| 加载 | `Loader2` (配合 animate-spin) |
| 空状态 | `FileQuestion` |

---

## 1.5 动效规范 (Motion)

### 1.5.1 动画时长

```css
:root {
  --duration-instant: 50ms;   /* 即时反馈 */
  --duration-fast: 150ms;     /* 微交互 */
  --duration-normal: 300ms;    /* 标准过渡 */
  --duration-slow: 500ms;      /* 复杂动画 */
  --duration-slower: 700ms;    /* 页面过渡 */
  --duration-page: 1000ms;     /* 页面加载 */
}
```

### 1.5.2 缓动函数

```css
:root {
  /* 标准缓动 - 大多数过渡 */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 进入缓动 - 元素出现 */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  
  /* 退出缓动 - 元素消失 */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  
  /* 弹性缓动 - 强调效果 */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* 特殊缓动 */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### 1.5.3 关键动画定义

```css
/* 入场动画 - 淡入上移 */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s var(--ease-out) forwards;
}

/* 缩放入场 */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 骨架屏闪烁 */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* 打字指示器 */
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}

/* 进度条填充 */
@keyframes progress-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.progress-animate {
  animation: progress-grow 1s var(--ease-bounce) forwards;
  transform-origin: left;
}

/* S+ 级发光 */
@keyframes tier-glow {
  0% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.4); }
  100% { box-shadow: 0 0 25px rgba(236, 72, 153, 0.5); }
}
```

### 1.5.4 交错动画延迟

```css
/* 表格行交错动画 */
.table-row-enter {
  animation: fade-in-up 400ms var(--ease-out) forwards;
  opacity: 0;
}

.table-row-enter:nth-child(1) { animation-delay: 0ms; }
.table-row-enter:nth-child(2) { animation-delay: 50ms; }
.table-row-enter:nth-child(3) { animation-delay: 100ms; }
.table-row-enter:nth-child(4) { animation-delay: 150ms; }
.table-row-enter:nth-child(5) { animation-delay: 200ms; }

/* 组件交错 */
.stagger-1 { animation-delay: 50ms; }
.stagger-2 { animation-delay: 100ms; }
.stagger-3 { animation-delay: 150ms; }
.stagger-4 { animation-delay: 200ms; }
.stagger-5 { animation-delay: 250ms; }
```

### 1.5.5 微交互动画

```css
/* 按钮按压效果 */
.btn-press:active {
  transform: scale(0.97);
  transition: transform 100ms;
}

/* 卡片悬停上浮 */
.card-hover {
  transition: transform 200ms var(--ease-default), 
              box-shadow 200ms var(--ease-default);
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

/* 图标旋转 */
.icon-rotate:hover {
  transform: rotate(12deg);
  transition: transform 300ms var(--ease-default);
}

/* 开关滑动 */
.toggle-thumb {
  transition: transform 200ms var(--ease-bounce);
}
```

### 1.5.6 页面过渡动画

```css
/* 页面加载动画 */
.page-enter {
  animation: fade-in-up 600ms var(--ease-out) forwards;
}

/* Modal 入场 */
.modal-enter {
  animation: scale-in 300ms var(--ease-bounce) forwards;
}

/* Dialog Backdrop */
.dialog-backdrop {
  animation: fade-in 200ms var(--ease-out) forwards;
}
```

### 1.5.7 动画性能要点

```css
/* 使用 transform 和 opacity 而非 width/height/left/top */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* 强制 GPU 加速 */
}

/* 避免动画时重排 */
.avoid-layout-thrash {
  transform: translateX(100px); /* GPU 加速 */
  /* 而非 left: 100px; */
}
```

---

# 第二部分：组件库规范

## 2.1 基础组件 (Basic Components)

### 2.1.1 Button

```tsx
// 按钮变体
<Button variant="default" />      // 主要按钮
<Button variant="secondary" />    // 次要按钮
<Button variant="outline" />      // 描边按钮
<Button variant="ghost" />        // 幽灵按钮
<Button variant="destructive" /> // 危险按钮
<Button variant="link" />        // 链接按钮

// 按钮尺寸
<Button size="default" />         // 默认
<Button size="sm" />              // 小
<Button size="lg" />              // 大
<Button size="icon" />             // 图标按钮

// 重要规范
// ✅ 使用 data-icon 放置图标
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

// ✅ 图标按钮需要 aria-label
<Button aria-label="Close">
  <XIcon />
</Button>

// ❌ 不要使用 isLoading
// ✅ 使用 Spinner + disabled 组合
<Button disabled>
  <SpinnerIcon />
  Loading
</Button>
```

### 2.1.2 Input

```tsx
// 基础输入框
<Input placeholder="Enter text..." />

// 尺寸
<Input size="default" />
<Input size="sm" />
<Input size="lg" />

// 状态
<Input disabled />
<Input data-invalid />  // 验证失败

// 重要规范
// ✅ 使用 FieldGroup + Field 包裹
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
    <FieldDescription>Enter your email</FieldDescription>
  </Field>
</FieldGroup>

// ❌ 不要直接裸用 Input
<div>
  <label>Email</label>
  <input />
</div>
```

### 2.1.3 Select

```tsx
// 基础选择器
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

// 重要规范
// ✅ SelectItem 必须放在 SelectGroup 中
// ✅ 使用 SelectLabel 为选项组添加标签
// ❌ 不要直接循环 SelectItem
```

### 2.1.4 Switch

```tsx
// 基础开关
<Switch />

// 带标签
<Switch id="notifications" />
<label htmlFor="notifications">Enable notifications</label>

// 重要规范
// ✅ 需要与 label 关联
// ❌ 不要裸用 Switch
```

### 2.1.5 Badge

```tsx
// 变体
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>

// MacRank Tier Badge
<Badge className="tier-s-plus">S+</Badge>
<Badge className="tier-a">A</Badge>

// 重要规范
// ✅ 使用 Badge 而非自定义 styled span
// ✅ Tier 颜色使用 CSS 类
```

### 2.1.6 Avatar

```tsx
// 基础头像
<Avatar>
  <AvatarImage src="/user.png" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// 重要规范
// ✅ 必须包含 AvatarFallback（图片加载失败时显示）
// ❌ 不要省略 AvatarFallback
```

---

## 2.2 复合组件 (Compound Components)

### 2.2.1 Card

```tsx
// 完整 Card 结构
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// 重要规范
// ✅ 使用完整 Card 组合：Header/Title/Description/Content/Footer
// ❌ 不要把所有内容都放在 CardContent 中
```

### 2.2.2 Dialog

```tsx
// 基础对话框
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogBody>
      {/* Content */}
    </DialogBody>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// 重要规范
// ✅ Dialog 必须有 Title（用于无障碍）
// ✅ 使用 asChild 处理自定义触发器
// ❌ 不要省略 DialogTitle
```

### 2.2.3 Tabs

```tsx
// 基础标签页
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>

// 重要规范
// ✅ TabsTrigger 必须放在 TabsList 中
// ❌ 不要直接渲染 TabsTrigger
```

### 2.2.4 Form (FieldGroup + Field)

```tsx
// 标准表单布局
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input id="name" />
    <FieldDescription>Your full name</FieldDescription>
  </Field>
  
  <Field data-invalid>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" aria-invalid />
    <FieldError>Invalid email address</FieldError>
  </Field>
</FieldGroup>

// 重要规范
// ✅ 使用 FieldGroup 包裹表单字段
// ✅ 验证失败时使用 data-invalid on Field, aria-invalid on control
// ❌ 不要使用 div + space-y-* 布局表单
```

### 2.2.5 Select with Option Set

```tsx
// 2-7 个选项使用 ToggleGroup
<ToggleGroup type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
</ToggleGroup>

// 重要规范
// ✅ 2-7 个选项使用 ToggleGroup
// ❌ 不要循环 Button 实现选项
```

---

## 2.3 业务组件 (Business Components)

### 2.3.1 TierBadge

MacRank 特有的评级徽章组件。

```tsx
// TierBadge 使用 Badge + 特定 CSS 类
<TierBadge tier="S+" />  // 幻彩渐变 + 发光动画
<TierBadge tier="S" />   // 紫色渐变
<TierBadge tier="A" />   // 蓝色渐变
<TierBadge tier="B" />   // 绿色渐变
<TierBadge tier="C" />   // 黄色渐变
<TierBadge tier="D" />   // 灰色渐变

// 变体
<TierBadge tier="S+" showGlow />  // 显示发光效果
<TierBadge tier="S+" size="sm" /> // 小尺寸
```

### 2.3.2 PerformanceChart

性能可视化图表组件。

```tsx
// 图表类型
<PerformanceChart 
  type="comprehensive"  // 综合
  data={performanceData}
/>

<PerformanceChart 
  type="single-core"     // 单核
  data={performanceData}
/>

<PerformanceChart 
  type="multi-core"      // 多核
  data={performanceData}
/>

<PerformanceChart 
  type="metal"           // Metal
  data={performanceData}
/>

// 功能
<PerformanceChart 
  onSelect={handleSelect}  // 选择机型回调
  highlightIds={['id1', 'id2']}  // 高亮指定机型
/>
```

### 2.3.3 MacTable

Mac 排行榜主表格组件。

```tsx
// 桌面端表格
<MacTable 
  data={macData}
  columns={columns}
  sortable
  onRowClick={handleRowClick}
/>

// 移动端自动切换为卡片布局

// 重要规范
// ✅ 桌面端 sticky 第一列
// ✅ 移动端卡片式布局
// ✅ 支持 skeleton 加载状态
```

### 2.3.4 CompareBar

浮动对比栏组件。

```tsx
// 对比栏
<CompareBar 
  selectedModels={models}
  onCompare={handleCompare}
  onClear={handleClear}
/>

// 状态
// 0 个选中：隐藏
// 1 个选中：显示 + 禁用
// 2 个选中：显示 + 激活
```

### 2.3.5 AIChat

AI 选购助手聊天组件。

```tsx
// 聊天组件
<AIChat 
  messages={messages}
  onSend={handleSend}
  isTyping={isTyping}
/>

// 消息气泡
// 用户消息：右侧，蓝色渐变
// AI 消息：左侧，灰色背景

// 功能
// - 打字指示器（三个跳动点）
// - 快速操作按钮
// - Markdown 渲染
```

### 2.3.6 TradeInCalculator

以旧换新计算器。

```tsx
// 计算器
<TradeInCalculator 
  models={macModels}
  onCalculate={handleCalculate}
/>

// 显示
// - 机型选择
// - 残值预估
// - 净成本计算
```

---

## 2.4 组件使用规则

### 2.4.1 导入规则

```tsx
// ✅ 使用别名导入
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ❌ 不要使用相对路径硬编码
import { Button } from "../../components/ui/button";
```

### 2.4.2 className 规则

```tsx
// ✅ 使用 className 布局，不覆盖组件内部样式
<div className="flex flex-col gap-4">
  <Button className="w-full">Full Width</Button>
</div>

// ❌ 不要覆盖组件颜色
<Button className="bg-red-500">Wrong</Button>

// ✅ 使用 variant 属性
<Button variant="destructive">Destructive</Button>
```

### 2.4.3 z-index 规则

```tsx
// ✅ 不要手动设置 z-index
// Dialog, Sheet, Popover 等组件自己处理层叠

// ❌ 不要这样做
<Dialog className="z-50">Wrong</Dialog>
```

### 2.4.4 尺寸规则

```tsx
// ✅ 宽高相等使用 size-*
<Avatar className="size-10" />      // ✅ 正确
<Avatar className="w-10 h-10" />    // ❌ 错误

// ✅ flex 子元素使用 gap-*
<div className="flex gap-4">         // ✅ 正确
<div className="space-x-4">         // ❌ 错误
```

### 2.4.5 状态样式规则

```tsx
// ✅ 使用语义化 tokens
<div className="bg-primary text-primary-foreground" />

// ❌ 不要使用 raw colors
<div className="bg-blue-500 text-white" />
```

---

# 第三部分：交互标准

## 3.1 交互模式库

### 3.1.1 模态框交互

```tsx
// 打开模态框
1. 点击触发器 → Backdrop 淡入 (200ms)
2. Modal 内容缩放入场 (300ms, ease-bounce)
3. 焦点聚焦到 Modal 内第一个可交互元素

// 关闭模态框
1. 点击关闭按钮/Backdrop/按 ESC
2. Modal 内容缩放退出 (200ms)
3. 焦点返回触发器

// 代码示例
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    {/* 自动处理入场动画 */}
  </DialogContent>
</Dialog>
```

### 3.1.2 下拉菜单交互

```tsx
// 打开
1. 点击触发器
2. Menu 从触发器下方展开 (150ms)
3. 焦点聚焦到第一个菜单项

// 键盘导航
- Arrow Down/Up: 在菜单项间移动
- Enter: 选中当前项
- Esc: 关闭菜单
- Tab: 关闭菜单并移动到下一个焦点

// 示例
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Action 1</DropdownMenuItem>
    <DropdownMenuItem>Action 2</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Destructive</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 3.1.3 标签页交互

```tsx
// 切换
1. 点击 TabsTrigger
2. TabsContent 淡入/淡出
3. 更新 ARIA 属性

// 键盘
- Arrow Left/Right: 在 Tabs 间切换
- Home: 移到第一个 Tab
- End: 移到最后一个 Tab

// 示例
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### 3.1.4 浮层交互

```tsx
// Tooltip
<Button>
  <Tooltip>
    <TooltipTrigger asChild>
      <InfoIcon />
    </TooltipTrigger>
    <TooltipContent>
      Additional information
    </TooltipContent>
  </Tooltip>
</Button>

// HoverCard
<HoverCard>
  <HoverCardTrigger asChild>
    <Link>Hover me</Link>
  </HoverCardTrigger>
  <HoverCardContent>
    {/* Preview content */}
  </HoverCardContent>
</HoverCard>
```

### 3.1.5 表单验证交互

```tsx
// 验证时机
- onBlur: 失去焦点时验证
- onChange: 实时验证（谨慎使用）
- onSubmit: 提交时验证

// 错误状态显示
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldError>Please enter a valid email</FieldError>
</Field>

// 成功状态
<Field data-valid>
  <Input aria-invalid={false} />
</Field>
```

---

## 3.2 交互反馈规范

### 3.2.1 按钮反馈

```tsx
// 按压效果
<Button 
  className="active:scale-[0.97] transition-transform"
>
  Click me
</Button>

// 禁用状态
<Button disabled>
  <LoaderIcon className="animate-spin" />
  Loading...
</Button>

// 成功反馈
<Button 
  onClick={handleSuccess}
  className="transition-all duration-300"
>
  {success ? (
    <CheckIcon data-icon="inline-start" />
  ) : (
    <SendIcon data-icon="inline-start" />
  )}
  {success ? "已发送" : "发送"}
</Button>
```

### 3.2.2 Toast 通知

```tsx
// 使用 sonner
import { toast } from "sonner";

// 成功
toast.success("操作成功！", {
  description: "您的更改已保存",
});

// 错误
toast.error("操作失败", {
  description: "请稍后重试",
});

// 信息
toast.info("提示", {
  description: "AI 助手已离线",
});

// 加载
const toastId = toast.loading("正在处理...");
// 完成后
toast.success("处理完成", { id: toastId });

// 规范
// ✅ 位置: 底部居中
// ✅ 时长: 3-5 秒
// ✅ 可手动关闭
```

### 3.2.3 加载状态

```tsx
// 骨架屏
<div className="animate-pulse">
  <div className="space-y-3">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
</div>

// Spinner
<Button disabled>
  <LoaderIcon className="animate-spin mr-2" />
  Loading
</Button>

// Progress
<Progress value={66} />

// 规范
// ✅ 使用 Skeleton 而非 animate-pulse div
// ✅ 显示进度百分比而非不确定进度
```

### 3.2.4 过渡动画

```tsx
// 状态切换
<div className="transition-all duration-300 ease-out">
  <Content show={isVisible} />
</div>

// 列表动画
<div className="space-y-2">
  {items.map((item, i) => (
    <div 
      key={item.id}
      className="animate-fade-in-up"
      style={{ animationDelay: `${i * 50}ms` }}
    >
      <Item />
    </div>
  ))}
</div>
```

---

## 3.3 错误处理规范

### 3.3.1 表单错误

```tsx
// 1. 输入时清除错误
<Input 
  onChange={() => clearError('email')}
  aria-invalid={!!errors.email}
/>

// 2. 显示具体错误信息
<FieldError>
  {errors.email.type === 'required' ? '邮箱不能为空' : '请输入有效的邮箱地址'}
</FieldError>

// 3. 错误时添加视觉提示
<Input 
  className={errors.email ? 'border-destructive' : ''}
/>
```

### 3.3.2 API 错误

```tsx
// 统一错误处理
async function fetchData() {
  try {
    setLoading(true);
    const data = await api.getData();
    setData(data);
  } catch (error) {
    // 显示错误 Toast
    toast.error("加载失败", {
      description: error.message || "请检查网络连接",
    });
    
    // 设置错误状态
    setError(error);
  } finally {
    setLoading(false);
  }
}

// 网络错误
if (error.code === 'NETWORK_ERROR') {
  toast.error("网络错误", {
    description: "请检查您的网络连接后重试",
  });
}

// 超时错误
if (error.code === 'TIMEOUT') {
  toast.error("请求超时", {
    description: "服务器响应时间过长，请稍后重试",
  });
}
```

### 3.3.3 边界情况

```tsx
// 组件卸载后不更新状态
useEffect(() => {
  let isMounted = true;
  
  fetchData().then(data => {
    if (isMounted) {
      setData(data);
    }
  });
  
  return () => {
    isMounted = false;
  };
}, []);
```

### 3.3.4 错误边界

```tsx
// ErrorBoundary 组件捕获子组件错误
<ErrorBoundary
  fallback={
    <div className="text-center p-8">
      <AlertTriangleIcon className="mx-auto mb-4 text-destructive" />
      <h2>出错了</h2>
      <p>页面加载出现问题</p>
      <Button onClick={() => window.location.reload()}>
        重新加载
      </Button>
    </div>
  }
>
  <ComponentThatMightError />
</ErrorBoundary>
```

---

## 3.4 空状态设计规范

### 3.4.1 空状态组件结构

```tsx
// 标准空状态
<div className="flex flex-col items-center justify-center py-16 px-4">
  {/* 空状态图标 */}
  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
    <SearchIcon className="w-12 h-12 text-muted-foreground" />
  </div>
  
  {/* 标题 */}
  <h3 className="text-xl font-bold text-foreground mb-2">
    未找到匹配结果
  </h3>
  
  {/* 描述 */}
  <p className="text-muted-foreground text-center max-w-md mb-6">
    没有找到与 "{keyword}" 匹配的 Mac 机型，请尝试其他搜索条件
  </p>
  
  {/* 操作 */}
  <Button onClick={clearFilters}>
    清除所有筛选
  </Button>
</div>
```

### 3.4.2 不同场景的空状态

```tsx
// 搜索无结果
<EmptyState
  icon={SearchIcon}
  title="未找到搜索结果"
  description={`没有找到与 "${query}" 相关的结果`}
  action={{ label: "清除搜索", onClick: clearSearch }}
/>

// 筛选无结果
<EmptyState
  icon={FilterIcon}
  title="筛选结果为空"
  description="没有符合当前筛选条件的机型"
  action={{ label: "重置筛选", onClick: resetFilters }}
/>

// 收藏为空
<EmptyState
  icon={HeartIcon}
  title="暂无收藏"
  description="点击表格中的收藏按钮添加收藏"
  action={{ label: "浏览机型", onClick: browseModels }}
/>

// 对比为空
<EmptyState
  icon={ScaleIcon}
  title="选择机型进行对比"
  description="勾选表格左侧的选择框添加机型进行对比"
/>

// 加载错误
<EmptyState
  icon={AlertTriangleIcon}
  title="加载失败"
  description="无法加载数据，请检查网络连接"
  action={{ label: "重试", onClick: retry }}
  variant="error"
/>
```

### 3.4.3 空状态设计要点

```css
/* 1. 视觉层级 */
空状态图标: 48-64px, muted 颜色
标题: 18-20px, font-bold
描述: 14-16px, muted-foreground
操作按钮: primary variant

/* 2. 间距 */
图标与标题: 24px (space-6)
标题与描述: 8px (space-2)
描述与操作: 24px (space-6)

/* 3. 图标选择 */
无数据: FileQuestionIcon 或 InboxIcon
无搜索结果: SearchIcon
无筛选结果: FilterIcon
收藏为空: HeartIcon
网络错误: WifiOffIcon 或 AlertTriangleIcon
```

### 3.4.4 骨架屏替代品

```tsx
// 表格骨架屏
<table>
  <tbody>
    {[...Array(5)].map((_, i) => (
      <tr key={i}>
        <td><div className="size-5 rounded skeleton" /></td>
        <td><div className="h-5 w-40 rounded skeleton" /></td>
        <td><div className="h-5 w-32 rounded skeleton" /></td>
        {/* ... 更多单元格 */}
      </tr>
    ))}
  </tbody>
</table>

// 卡片骨架屏
<div className="grid gap-4">
  {[...Array(3)].map((_, i) => (
    <Card key={i}>
      <CardHeader>
        <div className="h-6 w-32 rounded skeleton" />
        <div className="h-4 w-48 rounded skeleton" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 rounded skeleton" />
          <div className="h-4 w-3/4 rounded skeleton" />
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

---

# 第四部分：附录

## 4.1 组件清单

| 组件 | 分类 | 状态 | 规范文档 |
|-----|------|------|---------|
| Button | 基础 | ✅ | shadcn |
| Input | 基础 | ✅ | shadcn |
| Select | 基础 | ✅ | shadcn |
| Switch | 基础 | ✅ | shadcn |
| Badge | 基础 | ✅ | shadcn |
| Avatar | 基础 | ✅ | shadcn |
| Card | 复合 | ✅ | shadcn |
| Dialog | 复合 | ✅ | shadcn |
| Tabs | 复合 | ✅ | shadcn |
| DropdownMenu | 复合 | ✅ | shadcn |
| Tooltip | 复合 | ✅ | shadcn |
| Toast | 反馈 | ✅ | sonner |
| Skeleton | 反馈 | ✅ | shadcn |
| TierBadge | 业务 | ✅ | 本文档 |
| PerformanceChart | 业务 | ✅ | 本文档 |
| MacTable | 业务 | ✅ | 本文档 |
| CompareBar | 业务 | ✅ | 本文档 |
| AIChat | 业务 | ✅ | 本文档 |
| TradeInCalculator | 业务 | ✅ | 本文档 |

## 4.2 参考资源

- [shadcn/ui 官方文档](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Sonner Toast](https://sonner.emort.sh)

## 4.3 更新日志

| 版本 | 日期 | 变更 |
|-----|------|------|
| v2.0 | 2026-06-16 | 完整设计系统文档 |
| v1.0 | 2026-06-06 | 初始文档 |

---

*本文档与 MacRank v0.7.6 代码实现保持同步*

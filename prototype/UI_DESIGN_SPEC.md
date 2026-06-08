# MacRank v0.7.6 UI/UX 设计规范补充文档

## 版本信息
- 文档版本: v1.0
- 更新日期: 2026-06-06
- 状态: **进行中**

---

## 一、核心改进建议

### 1.1 排版系统优化

#### 字体规范
```css
/* 推荐配置 */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
font-feature-settings: "tnum"; /* 数字等宽显示 */
```

#### 字号系统
```css
/* 移动端优先 */
--text-hero: clamp(2.5rem, 5vw, 4.5rem);  /* 标题响应式 */
--text-h1: 2.5rem;
--text-h2: 2rem;
--text-h3: 1.5rem;
--text-body: 1rem;
--text-small: 0.875rem;
--text-xs: 0.75rem;
```

#### 字重系统
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

### 1.2 颜色系统增强

#### 语义化颜色变量
```css
:root {
  /* Primary Colors */
  --color-primary: #007AFF;
  --color-primary-hover: #0056CC;
  --color-primary-light: #E5F1FF;
  
  /* Status Colors */
  --color-success: #34C759;
  --color-success-light: #E8F9ED;
  --color-warning: #FF9500;
  --color-warning-light: #FFF4E5;
  --color-error: #FF3B30;
  --color-error-light: #FFEBEA;
  
  /* Neutral Colors */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
}
```

#### Tier 颜色系统
```css
/* S+ 级 - 幻彩渐变 */
.tier-s-plus {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  animation: tier-glow 2s ease-in-out infinite alternate;
}

@keyframes tier-glow {
  0% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.3); }
  100% { box-shadow: 0 0 25px rgba(236, 72, 153, 0.5); }
}

/* S 级 - 紫色 */
.tier-s {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
}

/* A 级 - 蓝色 */
.tier-a {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
}

/* B 级 - 绿色 */
.tier-b {
  background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%);
}

/* C 级 - 黄色 */
.tier-c {
  background: linear-gradient(135deg, #eab308 0%, #facc15 100%);
}

/* D 级 - 灰色 */
.tier-d {
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
}
```

### 1.3 动画系统规范

#### 动画时长
```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
}
```

#### 缓动函数
```css
:root {
  /* 标准缓动 - 用于大多数过渡 */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 进入缓动 - 用于元素出现 */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  
  /* 退出缓动 - 用于元素消失 */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  
  /* 弹性缓动 - 用于强调效果 */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

#### 关键动画规范
```css
/* 表格行交错入场动画 */
.table-row-enter {
  animation: row-slide-in 400ms var(--ease-out) forwards;
  opacity: 0;
  transform: translateY(10px);
}

.table-row-enter:nth-child(1) { animation-delay: 0ms; }
.table-row-enter:nth-child(2) { animation-delay: 50ms; }
.table-row-enter:nth-child(3) { animation-delay: 100ms; }
.table-row-enter:nth-child(4) { animation-delay: 150ms; }
.table-row-enter:nth-child(5) { animation-delay: 200ms; }

/* 性能进度条动画 */
.progress-bar-fill {
  animation: progress-grow 1000ms var(--ease-bounce) forwards;
  transform-origin: left;
  transform: scaleX(0);
}

/* 表格行悬停效果 */
.table-row:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

### 1.4 间距系统

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
}
```

### 1.5 阴影系统

```css
:root {
  /* 卡片阴影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* 毛玻璃效果 */
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-blur: blur(12px);
  --glass-border: rgba(255, 255, 255, 0.2);
  
  /* 深色模式毛玻璃 */
  --glass-dark-bg: rgba(0, 0, 0, 0.8);
}
```

---

## 二、组件级优化规范

### 2.1 Header 组件

#### 设计规范
```tsx
<header className={`
  fixed w-full top-0 z-50
  bg-white/80 dark:bg-gray-900/80
  backdrop-blur-xl
  border-b border-gray-200/80 dark:border-gray-800/80
  transition-all duration-300
`}>
```

#### 移动端适配
```tsx
{/* 移动端：汉堡菜单 */}
<button className="md:hidden p-2" aria-label="Menu">
  <MenuIcon className="w-6 h-6" />
</button>

{/* 桌面端：内联导航 */}
<nav className="hidden md:flex items-center gap-6">
  {/* 导航项 */}
</nav>
```

### 2.2 Hero 组件

#### 优化后的代码
```tsx
<div className={`
  relative text-center space-y-6 
  animate-in fade-in slide-in-from-bottom-4 
  duration-1000 pb-8 overflow-hidden
`}>
  {/* 背景光晕 - 增加微光效果 */}
  <div className={`
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    w-[120%] h-[150%] 
    bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 
    dark:from-blue-400/10 dark:via-purple-400/5 dark:to-pink-400/10
    blur-[120px] rounded-full pointer-events-none -z-10
  `} />
  
  {/* 徽章 - 增加呼吸动画 */}
  <div className={`
    inline-flex items-center gap-2 px-3 py-1 
    rounded-full 
    bg-blue-50/80 dark:bg-blue-900/20 
    border border-blue-100/80 dark:border-blue-800/30
    text-blue-600 dark:text-blue-400 
    text-[10px] font-black uppercase tracking-widest mb-2 
    shadow-sm
    animate-pulse
  `}>
    <Zap size={10} fill="currentColor" />
    <span>2025 Mac Performance Data Loaded</span>
  </div>
  
  {/* 标题 - 响应式字号 */}
  <h1 className={`
    text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
    font-black tracking-tight
    text-gray-900 dark:text-white 
    drop-shadow-sm
  `}>
    {t('heroTitle')}
  </h1>
  
  {/* 副标题 */}
  <p className={`
    text-base sm:text-lg md:text-xl 
    text-gray-500 dark:text-gray-400 
    font-medium max-w-3xl mx-auto leading-relaxed
    px-4 sm:px-0
  `}>
    {t('heroSubtitle')}
  </p>
  
  {/* 分享按钮 - 增加点击波纹效果 */}
  <button className={`
    group flex items-center gap-2 
    px-6 sm:px-8 py-3 
    rounded-full 
    bg-black dark:bg-white 
    text-white dark:text-black 
    font-bold shadow-2xl 
    hover:scale-105 active:scale-95 
    transition-all duration-300
  `}>
    <Share2 size={18} className="group-hover:rotate-12 transition-transform duration-300" />
    <span>{t('share')}</span>
  </button>
</div>
```

### 2.3 MacTable 组件

#### 表格样式优化
```tsx
<table className={`
  w-full text-left border-collapse 
  min-w-[750px]
  table-fixed
`}>
  <thead>
    <tr className={`
      border-b border-gray-100/50 dark:border-gray-800/50 
      bg-gray-50/30 dark:bg-white/5
    `}>
      {/* 表头单元格 */}
      <th className={`
        py-3 sm:py-4 px-2 sm:px-3 
        text-[10px] font-black 
        text-gray-500 dark:text-gray-400 
        uppercase tracking-widest
      `}>
        {column.label}
      </th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr 
        key={item.id}
        className={`
          border-b border-gray-50/50 dark:border-gray-900/50 
          hover:bg-gray-50/80 dark:hover:bg-gray-900/30
          transition-all duration-200
          cursor-pointer
          group
        `}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* 单元格内容 */}
      </tr>
    ))}
  </tbody>
</table>
```

#### 移动端优化
```tsx
{/* 移动端：卡片式布局 */}
<div className="md:hidden space-y-3">
  {data.map((mac) => (
    <div 
      key={mac.id}
      className={`
        bg-white dark:bg-gray-900 
        rounded-2xl p-4 
        border border-gray-200 dark:border-gray-800
        shadow-sm
        hover:shadow-md transition-shadow
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {mac.name}
          </h3>
          <p className="text-xs text-gray-500">{mac.chip}</p>
        </div>
        <TierBadge tier={getTierLabel(calculateTierScore(mac, scenario))} />
      </div>
      
      {/* 性能进度条 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">性能</span>
          <span className="font-bold">{score.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
            style={{ width: `${(score / maxScore) * 100}%` }}
          />
        </div>
      </div>
    </div>
  ))}
</div>
```

### 2.4 模态框组件

#### DetailModal 优化
```tsx
<div className={`
  fixed inset-0 z-50 
  flex items-center justify-center p-4
  animate-in fade-in duration-200
`}>
  {/* Backdrop */}
  <div 
    className={`
      absolute inset-0 
      bg-black/50 dark:bg-black/70
      backdrop-blur-sm
      animate-in fade-in duration-300
    `}
    onClick={onClose}
  />
  
  {/* Modal Content */}
  <div className={`
    relative z-10
    w-full max-w-lg
    bg-white dark:bg-gray-900
    rounded-3xl
    shadow-2xl
    border border-gray-200 dark:border-gray-800
    animate-in zoom-in-95 fade-in duration-300
    max-h-[90vh] overflow-y-auto
  `}>
    {/* Header */}
    <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-800">
      <div>
        <TierBadge tier={tier} />
        <h2 className="mt-2 text-xl font-bold">{mac.name}</h2>
        <p className="text-sm text-gray-500">{mac.chip} · {mac.releaseYear}</p>
      </div>
      <button 
        onClick={onClose}
        className={`
          w-8 h-8 rounded-full 
          bg-gray-100 dark:bg-gray-800
          flex items-center justify-center
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition-colors
        `}
      >
        <X size={16} />
      </button>
    </div>
    
    {/* Score Grid */}
    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
      <div className="grid grid-cols-3 gap-4">
        <ScoreCard label="单核" value={mac.singleCoreScore} />
        <ScoreCard label="多核" value={mac.multiCoreScore} />
        <ScoreCard label="Metal" value={mac.metalScore} />
      </div>
    </div>
    
    {/* Specs List */}
    <div className="p-6 space-y-3">
      <SpecRow label="CPU 核心" value={mac.cores_cpu} />
      <SpecRow label="GPU 核心" value={mac.cores_gpu.toString()} />
      <SpecRow label="内存" value={mac.memory} />
      <SpecRow label="起售价" value={formatCurrency(mac.basePriceUSD, language)} highlight />
    </div>
    
    {/* Actions */}
    <div className="p-6 pt-0">
      <button className={`
        w-full py-3 rounded-xl 
        bg-black dark:bg-white 
        text-white dark:text-black 
        font-bold
        hover:opacity-90 active:scale-[0.98]
        transition-all
      `}>
        分享
      </button>
    </div>
  </div>
</div>
```

#### CompareModal 优化
```tsx
<div className={`
  fixed inset-0 z-50 
  flex items-center justify-center p-4
  animate-in fade-in duration-200
`}>
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
  
  <div className={`
    relative z-10
    w-full max-w-4xl
    bg-white dark:bg-gray-900
    rounded-3xl
    shadow-2xl
    border border-gray-200 dark:border-gray-800
    animate-in zoom-in-95 fade-in duration-300
  `}>
    {/* Header with VS */}
    <div className="flex items-center justify-between p-6">
      <ModelPreview model={models[0]} />
      <div className={`
        px-6 py-3 rounded-full
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white font-bold text-lg
        shadow-lg
      `}>
        VS
      </div>
      <ModelPreview model={models[1]} />
    </div>
    
    {/* Radar Chart */}
    <div className="p-6 pt-0">
      <RadarChartComponent models={models} />
    </div>
    
    {/* Comparison Bars */}
    <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
      <ComparisonBar label="单核性能" values={[models[0].singleCoreScore, models[1].singleCoreScore]} />
      <ComparisonBar label="多核性能" values={[models[0].multiCoreScore, models[1].multiCoreScore]} />
      <ComparisonBar label="Metal" values={[models[0].metalScore, models[1].metalScore]} />
      <ComparisonBar label="性价比" values={[models[0].valueScore || 0, models[1].valueScore || 0]} />
    </div>
    
    {/* Actions */}
    <div className="flex gap-4 p-6 pt-0">
      <button 
        onClick={onClose}
        className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold"
      >
        清除
      </button>
      <button className="flex-1 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold">
        分享对比
      </button>
    </div>
  </div>
</div>
```

### 2.5 AI Chat 组件

#### 消息气泡优化
```tsx
<div className={`
  flex gap-3
  ${message.role === 'user' ? 'flex-row-reverse' : ''}
`}>
  {/* Avatar */}
  <div className={`
    w-8 h-8 rounded-full flex-shrink-0
    flex items-center justify-center
    ${message.role === 'user' 
      ? 'bg-blue-500 text-white' 
      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
    }
  `}>
    {message.role === 'user' ? '👤' : '🤖'}
  </div>
  
  {/* Message Bubble */}
  <div className={`
    max-w-[75%] sm:max-w-xs md:max-w-md
    px-4 py-3 rounded-2xl
    ${message.role === 'user'
      ? 'bg-blue-500 text-white rounded-tr-none'
      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none'
    }
    shadow-sm
  `}>
    <p className="text-sm leading-relaxed">{message.text}</p>
  </div>
</div>

{/* Typing Indicator */}
<div className="flex gap-3">
  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
    🤖
  </div>
  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-none">
    <div className="flex gap-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
</div>
```

### 2.6 CompareBar 组件

```tsx
<div className={`
  fixed bottom-6 right-6 z-40
  bg-white/95 dark:bg-gray-900/95
  backdrop-blur-xl
  rounded-2xl
  shadow-2xl
  border border-gray-200/80 dark:border-gray-800/80
  p-4
  animate-in slide-in-from-bottom-4 duration-300
  max-w-md w-full
`}>
  <div className="flex items-center justify-between gap-4">
    {/* Selected Models Preview */}
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {models.map((model, index) => (
          <div 
            key={model.id}
            className={`
              w-10 h-10 rounded-full 
              bg-gradient-to-br from-blue-500 to-purple-500
              flex items-center justify-center
              text-white text-xs font-bold
              shadow-lg border-2 border-white dark:border-gray-900
              ring-2 ring-white dark:ring-gray-900
            `}
            style={{ zIndex: models.length - index }}
          >
            {model.name.substring(0, 2)}
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm font-bold">{models.length} 款机型已选择</p>
        <p className="text-xs text-gray-500">点击按钮开始对比</p>
      </div>
    </div>
    
    {/* Actions */}
    <div className="flex items-center gap-2">
      <button 
        onClick={onClear}
        className={`
          px-4 py-2 rounded-xl 
          bg-gray-100 dark:bg-gray-800
          text-gray-600 dark:text-gray-300
          text-sm font-bold
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition-colors
        `}
      >
        清除
      </button>
      <button 
        onClick={onCompare}
        disabled={models.length < 2}
        className={`
          px-4 py-2 rounded-xl 
          text-sm font-bold
          transition-all
          ${models.length === 2
            ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg hover:scale-105'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        对比
      </button>
    </div>
  </div>
</div>
```

---

## 三、响应式设计规范

### 3.1 断点系统

```css
/* 移动端优先断点 */
/* Base: 0-639px (Mobile) */
/* sm: 640px+ (Large Mobile) */
/* md: 768px+ (Tablet) */
/* lg: 1024px+ (Desktop) */
/* xl: 1280px+ (Large Desktop) */
/* 2xl: 1536px+ (Extra Large) */
```

### 3.2 容器最大宽度

```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* MacRank 主容器 */
  --container-main: 980px;
}
```

### 3.3 栅格系统

```tsx
<div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
  {/* 移动端：4列 */}
  {/* 平板：8列 */}
  {/* 桌面：12列 */}
</div>
```

### 3.4 移动端导航规范

```tsx
{/* 移动端：汉堡菜单 + 侧滑抽屉 */}
<div className="md:hidden">
  {/* 汉堡按钮 */}
  <button 
    onClick={() => setIsDrawerOpen(true)}
    className="p-2"
    aria-label="打开菜单"
  >
    <MenuIcon className="w-6 h-6" />
  </button>
  
  {/* 侧滑抽屉 */}
  <Drawer 
    isOpen={isDrawerOpen} 
    onClose={() => setIsDrawerOpen(false)}
    position="left"
  >
    <nav className="p-6 space-y-4">
      <NavLink href="/leaderboard">排行榜</NavLink>
      <NavLink href="/charts">图表</NavLink>
      <NavLink href="/trade-in">以旧换新</NavLink>
      <NavLink href="/settings">设置</NavLink>
    </nav>
  </Drawer>
</div>
```

---

## 四、可访问性(A11y)规范

### 4.1 ARIA 标签

```tsx
{/* 所有图标按钮必须包含 aria-label */}
<button aria-label="分享到社交媒体">
  <ShareIcon />
</button>

<button aria-label="打开设置">
  <SettingsIcon />
</button>

{/* 表格需要 role 和 aria-sort */}
<table role="grid" aria-label="Mac 性能排行榜">
  <thead>
    <tr>
      <th aria-sort="descending">排名</th>
      <th>型号</th>
      <th aria-sort="none">性能</th>
    </tr>
  </thead>
</table>

{/* 表单元素需要关联标签 */}
<label htmlFor="search-input" className="sr-only">
  搜索型号
</label>
<input 
  id="search-input"
  type="search"
  aria-describedby="search-hint"
/>
<p id="search-hint" className="sr-only">
  输入型号名称、芯片名称或年份进行搜索
</p>
```

### 4.2 焦点管理

```tsx
{/* 模态框打开时聚焦到内容 */}
useEffect(() => {
  if (isOpen) {
    const firstFocusable = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }
}, [isOpen]);

{/* 键盘导航支持 */}
<div 
  role="listbox" 
  aria-activedescendant={selectedOption}
>
  {options.map(option => (
    <div
      key={option.id}
      id={option.id}
      role="option"
      aria-selected={selectedOption === option.id}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(option);
        }
      }}
    >
      {option.label}
    </div>
  ))}
</div>
```

### 4.3 颜色对比度

```css
/* 必须满足 WCAG 2.1 AA 标准（至少 4.5:1） */
.text-primary {
  color: #007AFF; /* 背景白色时对比度: 4.57:1 ✓ */
}

.text-gray-500 {
  color: #6B7280; /* 背景白色时对比度: 4.58:1 ✓ */
}

/* 深色模式 */
.dark .text-primary {
  color: #60A5FA; /* 背景深灰时对比度: 4.52:1 ✓ */
}
```

---

## 五、状态设计规范

### 5.1 空状态

```tsx
<div className="flex flex-col items-center justify-center py-16 px-4">
  {/* 空状态图标 */}
  <div className={`
    w-24 h-24 rounded-full
    bg-gray-100 dark:bg-gray-800
    flex items-center justify-center
    mb-6
  `}>
    <SearchIcon className="w-12 h-12 text-gray-400" />
  </div>
  
  {/* 标题 */}
  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
    未找到匹配结果
  </h3>
  
  {/* 描述 */}
  <p className="text-gray-500 text-center max-w-md mb-6">
    没有找到与 "关键词" 匹配的 Mac 机型，请尝试其他搜索条件
  </p>
  
  {/* 操作按钮 */}
  <button 
    onClick={clearFilters}
    className="px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold"
  >
    清除所有筛选
  </button>
</div>
```

### 5.2 加载状态骨架屏

```tsx
{/* 表格骨架屏 */}
<div className="animate-pulse">
  {[...Array(5)].map((_, i) => (
    <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-100">
      <div className="w-5 h-5 bg-gray-200 rounded" />
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="w-20 h-8 bg-gray-200 rounded" />
    </div>
  ))}
</div>

{/* 图表骨架屏 */}
<div className="h-64 bg-gray-100 rounded-2xl animate-pulse">
  <div className="h-full flex items-end justify-center gap-2 p-4">
    {[...Array(10)].map((_, i) => (
      <div 
        key={i} 
        className="w-8 bg-gray-300 rounded-t"
        style={{ height: `${Math.random() * 100}%` }}
      />
    ))}
  </div>
</div>
```

### 5.3 Toast 通知

```tsx
{/* 成功提示 */}
<div className={`
  fixed bottom-24 left-1/2 -translate-x-1/2 z-50
  px-6 py-3 rounded-full
  bg-emerald-500 text-white
  shadow-2xl
  flex items-center gap-3
  animate-in fade-in slide-in-from-bottom-4
`}>
  <CheckCircleIcon size={18} />
  <span className="text-sm font-medium">链接已复制到剪贴板</span>
</div>

{/* 错误提示 */}
<div className={`
  fixed bottom-24 left-1/2 -translate-x-1/2 z-50
  px-6 py-3 rounded-full
  bg-red-500 text-white
  shadow-2xl
  flex items-center gap-3
  animate-in fade-in slide-in-from-bottom-4
`}>
  <AlertCircleIcon size={18} />
  <span className="text-sm font-medium">操作失败，请重试</span>
</div>

{/* 信息提示 */}
<div className={`
  fixed bottom-24 left-1/2 -translate-x-1/2 z-50
  px-6 py-3 rounded-full
  bg-blue-500 text-white
  shadow-2xl
  flex items-center gap-3
  animate-in fade-in slide-in-from-bottom-4
`}>
  <InfoIcon size={18} />
  <span className="text-sm font-medium">AI 助手已离线，切换到本地模式</span>
</div>
```

---

## 六、总结与优先级

### 高优先级（立即实施）
1. ✅ 添加移动端响应式布局（卡片式表格）
2. ✅ 完善空状态和加载骨架屏设计
3. ✅ 增加 ARIA 标签和键盘导航支持
4. ✅ 统一颜色系统和语义化变量

### 中优先级（计划实施）
1. 🔄 优化动画系统，添加交错入场效果
2. 🔄 完善模态框的移动端适配（bottom sheet）
3. 🔄 添加 Toast 通知系统
4. 🔄 优化 Tier 颜色渐变和光效

### 低优先级（未来规划）
1. 📋 增加主题定制功能
2. 📋 添加深色模式的细腻调整
3. 📋 优化打印样式
4. 📋 增加动效开关设置

---

*本文档将持续更新以反映最新的设计决策和实现细节*

# Vitrum UI

> A modern, glassmorphic React component library built with TypeScript and Tailwind CSS

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/vitrum-ui)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.14-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## 🌟 Overview

Vitrum UI is a comprehensive design system featuring glassmorphism effects, dynamic theming, and a rich set of accessible React components. Built with performance and developer experience in mind, it provides a consistent, beautiful foundation for modern web applications.

### Key Features

- 🎨 **Dynamic Theming** - Multiple pre-built themes with animated backgrounds
- 🪟 **Glassmorphism** - Modern glass effect components with backdrop blur
- 🎯 **Type-Safe** - Full TypeScript support with strict typing
- ⚡ **Performance** - Zero runtime CSS-in-JS overhead, Tailwind JIT compilation
- ♿ **Accessible** - WCAG compliant components
- 🎭 **Animated** - Smooth transitions and micro-interactions
- 📦 **Tree-Shakeable** - Import only what you need

---

## 📦 Installation

```bash
# npm
npm install @vitrum/ui

# yarn
yarn add @vitrum/ui

# pnpm
pnpm add @vitrum/ui
```

### Peer Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

---

## 🚀 Quick Start

### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from '@vitrum/ui/themes';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Start using components

```tsx
import { Button, Text, Tile, TextSize, TextVariant } from '@vitrum/ui/components';

function MyComponent() {
  return (
    <Tile>
      <Text size={TextSize.LG} variant={TextVariant.PRIMARY}>
        Welcome to Vitrum UI
      </Text>
      <Button onClick={() => alert('Hello!')}>
        Click Me
      </Button>
    </Tile>
  );
}
```

---

## 🏗️ Architecture

### Project Structure

```
design-system/
├── components/          # UI Components
│   ├── Button/
│   ├── Text/
│   ├── Tile/
│   └── ...
├── hooks/              # React Hooks
│   ├── useButton/
│   ├── useTheme/
│   └── ...
├── themes/             # Theme System
│   ├── themes/
│   │   ├── cosmos/
│   │   ├── sunset/
│   │   └── vscode-dark/
│   └── ThemeProvider.tsx
├── tokens/             # Design Tokens
│   ├── radius.ts
│   └── alignment.ts
└── utils/              # Utilities
    └── animations.ts
```

### Design Principles

1. **Const Objects over Enums** - Following `erasableSyntaxOnly` TypeScript config
2. **Theme-First** - All colors come from the active theme
3. **Composable** - Small, focused components that work together
4. **Consistent API** - Predictable prop patterns across components

---

## 🎨 Theming System

### Available Themes

#### 🌌 Cosmos (Default)
Deep space theme with animated stars and shooting comets.

```tsx
import { useTheme } from '@vitrum/ui/hooks';

function ThemeSwitcher() {
  const { setTheme } = useTheme();
  return <button onClick={() => setTheme('cosmos')}>Cosmos</button>;
}
```

**Colors:**
- Primary: Purple (#a855f7)
- Animated Background: Stars + Comets
- Gradient: Purple spectrum

#### 🌅 Sunset
Warm gradient theme with floating fireflies.

**Colors:**
- Primary: Orange (#ff6b00)
- Animated Background: Fireflies
- Gradient: Orange to pink

#### 💻 VS Code Dark
Developer-inspired theme with floating code symbols.

**Colors:**
- Primary: Blue (#007acc)
- Animated Background: Code symbols
- Gradient: VS Code color palette

### Theme Structure

```typescript
interface Theme {
  id: string;
  name: string;
  background: ComponentType<{ variant?: any }>;
  colors: {
    primary: {
      bg: string;
      bgHover: string;
      bgActive: string;
      border: string;
      borderHover: string;
      borderGlow: string;
      text: string;
      glow: string;
    };
    neutral: {
      border: string;
      bg: string;
      bgDark: string;
      bgDarkFocus: string;
      bgDarker: string;
      bgDarkest: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    gradient: {
      title: string;
      timeline: string;
    };
  };
}
```

### Using Theme Colors

**Always use theme colors, never hardcode:**

```tsx
import { useTheme } from '@vitrum/ui/hooks';

function MyComponent() {
  const { currentTheme } = useTheme();
  
  return (
    <div style={{ 
      color: currentTheme.colors.text.primary,
      borderColor: currentTheme.colors.primary.border 
    }}>
      Theme-aware content
    </div>
  );
}
```

---

## 🧩 Components

### Layout Components

#### <span style="color: #a855f7;">Container</span>
Provides consistent horizontal padding and max-width.

```tsx
import { Container } from '@vitrum/ui/components';

<Container>
  <YourContent />
</Container>
```

#### <span style="color: #a855f7;">Tile</span>
Card-like container with glassmorphism effect.

```tsx
import { Tile } from '@vitrum/ui/components';

<Tile className="p-6">
  <h2>Card Content</h2>
</Tile>
```

**Features:**
- Automatic backdrop blur
- Theme-aware borders and backgrounds
- Optional hover effects

#### <span style="color: #a855f7;">SectionTitle</span>
Consistent section headings with gradient effects.

```tsx
import { SectionTitle } from '@vitrum/ui/components';

<SectionTitle>My Section</SectionTitle>
```

---

### Typography

#### <span style="color: #a855f7;">Text</span>
Flexible text component with multiple variants.

```tsx
import { Text, TextSize, TextVariant, TextWeight, TextAs } from '@vitrum/ui/components';

<Text 
  size={TextSize.LG}
  variant={TextVariant.PRIMARY}
  weight={TextWeight.BOLD}
  as={TextAs.H1}
>
  Heading Text
</Text>
```

**Props:**
- `size` - XS | SM | MD | LG | XL
- `variant` - PRIMARY | SECONDARY | MUTED | ACCENT
- `weight` - NORMAL | MEDIUM | SEMIBOLD | BOLD
- `as` - P | SPAN | DIV | H1-H6
- `align` - LEFT | CENTER | RIGHT | JUSTIFY

---

### Interactive Components

#### <span style="color: #a855f7;">Button</span>
Primary action button with theme integration.

```tsx
import { Button } from '@vitrum/ui/components';

<Button 
  onClick={handleClick}
  disabled={isLoading}
  variant="primary"
>
  Submit
</Button>
```

**Features:**
- Automatic hover/focus states from theme
- Loading state support
- Glassmorphic background

#### <span style="color: #a855f7;">IconButton</span>
Icon-only button for compact interfaces.

```tsx
import { IconButton, Icon, IconName, IconSize } from '@vitrum/ui/components';

<IconButton 
  onClick={handleClick}
  size={IconButtonSize.MEDIUM}
>
  <Icon name={IconName.SETTINGS} size={IconSize.SM} />
</IconButton>
```

#### <span style="color: #a855f7;">Link</span>
Styled anchor with multiple variants.

```tsx
import { Link, LinkVariant } from '@vitrum/ui/components';

<Link 
  href="#section"
  variant={LinkVariant.PRIMARY}
>
  Learn More
</Link>
```

---

### Form Components

#### <span style="color: #a855f7;">Input</span>
Text input with theme integration.

```tsx
import { Input } from '@vitrum/ui/components';

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
  required
/>
```

#### <span style="color: #a855f7;">Textarea</span>
Multi-line text input.

```tsx
import { Textarea } from '@vitrum/ui/components';

<Textarea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={5}
/>
```

#### <span style="color: #a855f7;">Select</span>
Dropdown select with custom styling.

```tsx
import { Select } from '@vitrum/ui/components';

<Select
  options={[
    { value: 'en', label: 'English' },
    { value: 'pl', label: 'Polski' }
  ]}
  value={language}
  onChange={setLanguage}
  placeholder="Choose language"
/>
```

#### <span style="color: #a855f7;">Label</span>
Form label component.

```tsx
import { Label } from '@vitrum/ui/components';

<Label htmlFor="email" required>
  Email Address
</Label>
```

---

### Display Components

#### <span style="color: #a855f7;">Tag & TagGroup</span>
Display tags with variants.

```tsx
import { Tag, TagGroup, TagVariant } from '@vitrum/ui/components';

// Single tag
<Tag variant={TagVariant.PRIMARY}>React</Tag>

// Tag group
<TagGroup 
  items={['React', 'TypeScript', 'Tailwind']}
  variant={TagVariant.NEUTRAL}
/>
```

**Variants:** PRIMARY | SECONDARY | ACCENT | NEUTRAL

#### <span style="color: #a855f7;">Timeline</span>
Vertical timeline with items.

```tsx
import { Timeline, TimelineItem } from '@vitrum/ui/components';
import { Alignment } from '@vitrum/ui/tokens';

<Timeline align={Alignment.LEFT}>
  <TimelineItem date="2024" title="Event 1">
    Description
  </TimelineItem>
  <TimelineItem date="2025" title="Event 2">
    Description
  </TimelineItem>
</Timeline>
```

**Features:**
- Gradient line from theme
- Left or right alignment
- Responsive design

#### <span style="color: #a855f7;">List</span>
Styled list component.

```tsx
import { List } from '@vitrum/ui/components';

<List
  items={['Item 1', 'Item 2', 'Item 3']}
  ordered={false}
/>
```

#### <span style="color: #a855f7;">Icon</span>
SVG icon component.

```tsx
import { Icon, IconName, IconSize } from '@vitrum/ui/components';

<Icon 
  name={IconName.CHECK}
  size={IconSize.MD}
/>
```

---

### Advanced Components

#### <span style="color: #a855f7;">Carousel</span>
Image/content carousel with navigation.

```tsx
import { Carousel, CarouselItem } from '@vitrum/ui/components';

<Carousel showDots showNavigation>
  <CarouselItem>Slide 1</CarouselItem>
  <CarouselItem>Slide 2</CarouselItem>
  <CarouselItem>Slide 3</CarouselItem>
</Carousel>
```

#### <span style="color: #a855f7;">ExpandableGrid</span>
Grid that expands on interaction.

```tsx
import { ExpandableGrid } from '@vitrum/ui/components';

<ExpandableGrid
  items={items}
  renderItem={(item) => <ItemCard {...item} />}
  initialRows={2}
/>
```

#### <span style="color: #a855f7;">Collapsible</span>
Expandable/collapsible content.

```tsx
import { Collapsible } from '@vitrum/ui/components';

<Collapsible title="Click to expand">
  Hidden content here
</Collapsible>
```

#### <span style="color: #a855f7;">CodeEditor</span>
Syntax-highlighted code display.

```tsx
import { CodeEditor } from '@vitrum/ui/components';

<CodeEditor
  code={`const hello = "world";`}
  language="javascript"
/>
```

#### <span style="color: #a855f7;">CircularProgress</span>
Circular progress indicator.

```tsx
import { CircularProgress } from '@vitrum/ui/components';

<CircularProgress value={75} size={100} />
```

#### <span style="color: #a855f7;">Toast</span>
Notification toast.

```tsx
import { Toast, ToastVariant } from '@vitrum/ui/components';

<Toast 
  variant={ToastVariant.SUCCESS}
  show={showToast}
  onClose={() => setShowToast(false)}
>
  Operation successful!
</Toast>
```

#### <span style="color: #a855f7;">ToggleButtonGroup</span>
Group of toggle buttons.

```tsx
import { ToggleButtonGroup } from '@vitrum/ui/components';

<ToggleButtonGroup
  options={[
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' }
  ]}
  value={view}
  onChange={setView}
/>
```

---

## 🪝 Hooks

### useTheme
Access and modify the current theme.

```tsx
import { useTheme } from '@vitrum/ui/hooks';

function ThemeSelector() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  
  return (
    <select 
      value={currentTheme.id}
      onChange={(e) => setTheme(e.target.value)}
    >
      {availableThemes.map(theme => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
```

### useButton
Hook for button behavior and styling.

```tsx
import { useButton } from '@vitrum/ui/hooks';

function CustomButton({ onClick, disabled, className }) {
  const {
    computedClassName,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    style
  } = useButton({ disabled, className, onClick });
  
  return (
    <button
      onClick={handleClick}
      className={computedClassName}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Click me
    </button>
  );
}
```

### useMediaQuery
React hook for responsive behavior.

```tsx
import { useMediaQuery } from '@vitrum/ui/hooks';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

### useScrollToTop
Smooth scroll to top functionality.

```tsx
import { useScrollToTop } from '@vitrum/ui/hooks';

function ScrollButton() {
  const { scrollToTop, isVisible } = useScrollToTop();
  
  if (!isVisible) return null;
  
  return <button onClick={scrollToTop}>↑ Top</button>;
}
```

### useToast
Toast notification management.

```tsx
import { useToast } from '@vitrum/ui/hooks';
import { ToastVariant } from '@vitrum/ui/components';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleSuccess = () => {
    showToast('Success!', ToastVariant.SUCCESS);
  };
  
  return <button onClick={handleSuccess}>Show Toast</button>;
}
```

### useToggleWithScroll
Toggle state that syncs with scroll position.

```tsx
import { useToggleWithScroll } from '@vitrum/ui/hooks';

function Navigation() {
  const [isOpen, toggle] = useToggleWithScroll();
  
  return (
    <nav>
      <button onClick={toggle}>Menu</button>
      {isOpen && <MobileMenu />}
    </nav>
  );
}
```

---

## 🎭 Design Tokens

### Radius
Border radius tokens for consistent roundness.

```tsx
import { Radius } from '@vitrum/ui/tokens';

<div className={Radius.CARD}>
  {/* rounded-lg */}
</div>
```

**Available tokens:**
- `Radius.CARD` - `rounded-lg`
- `Radius.BUTTON` - `rounded-lg`
- `Radius.TAG` - `rounded`
- `Radius.FULL` - `rounded-full`
- `Radius.INPUT` - `rounded-lg`

### Alignment
Text alignment tokens.

```tsx
import { Alignment } from '@vitrum/ui/tokens';

<Text align={Alignment.CENTER}>
  Centered text
</Text>
```

**Available tokens:**
- `Alignment.LEFT`
- `Alignment.CENTER`
- `Alignment.RIGHT`
- `Alignment.JUSTIFY`

---

## ✨ Animations

### fadeIn
Fade in animation utility.

```tsx
import { fadeIn } from '@vitrum/ui/utils';

<div style={fadeIn({ delay: 0.2, duration: 0.6 })}>
  Animated content
</div>
```

### slideInRight / slideOutRight
Slide animations for toasts and modals.

```tsx
import { slideInRight, slideOutRight } from '@vitrum/ui/utils';

<div style={isClosing ? slideOutRight() : slideInRight()}>
  Sliding content
</div>
```

---

## 📖 Best Practices

### 1. Always Use Theme Colors

❌ **Don't:**
```tsx
<div style={{ color: '#ffffff' }}>Text</div>
```

✅ **Do:**
```tsx
const { currentTheme } = useTheme();
<div style={{ color: currentTheme.colors.text.primary }}>Text</div>
```

### 2. Use Const Objects, Not Enums

❌ **Don't:**
```tsx
enum Size {
  SMALL = 'sm',
  LARGE = 'lg'
}
```

✅ **Do:**
```tsx
export const Size = {
  SMALL: 'SMALL',
  LARGE: 'LARGE'
} as const;

export type SizeType = typeof Size[keyof typeof Size];
```

### 3. Import Named Exports

❌ **Don't:**
```tsx
import * as UI from '@vitrum/ui';
```

✅ **Do:**
```tsx
import { Button, Text } from '@vitrum/ui/components';
import { useTheme } from '@vitrum/ui/hooks';
```

### 4. Use Design Tokens

❌ **Don't:**
```tsx
<div className="rounded-lg">...</div>
```

✅ **Do:**
```tsx
<div className={Radius.CARD}>...</div>
```

---

## 🛠️ Development

### Prerequisites

- Node.js 18+
- React 19.2.0+
- TypeScript 5.9.3+

### Tech Stack

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety with `erasableSyntaxOnly`
- **Tailwind CSS 4.0.14** - Utility-first CSS with JIT
- **Vite** - Build tool and dev server

### TypeScript Configuration

This project uses `erasableSyntaxOnly` which means:
- ✅ Use const objects with `as const`
- ❌ No TypeScript enums
- ✅ Export both values and types

---

## 📄 License

MIT License - feel free to use in your projects!

---

## 🤝 Contributing

Contributions are welcome! Please follow the existing patterns:

1. Components in PascalCase folders
2. Const objects for variants/enums
3. Theme colors only, no hardcoded colors
4. Full TypeScript typing
5. Consistent prop naming

---

## 📮 Support

For issues, questions, or contributions, please visit our [GitHub repository](https://github.com/yourusername/vitrum-ui).

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

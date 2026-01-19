# Design System Documentation

## Overview

Comprehensive design system for the Portfolio application built with React, TypeScript, and Tailwind CSS. Provides reusable components, hooks, themes, and utilities for consistent UI development.

## Table of Contents

- [Components](#components)
- [Hooks](#hooks)
- [Themes](#themes)
- [Tokens](#tokens)
- [Utils](#utils)

---

## Components

### Layout Components

#### Container
Provides consistent horizontal padding and max-width for content sections.

**Props:**
- `children: ReactNode` - Content to be wrapped
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Container>
  <SectionTitle>My Section</SectionTitle>
</Container>
```

**Features:**
- 5% horizontal padding (`px-[5%]`)
- Centered with `mx-auto`
- Responsive max-width

---

#### Tile
Card-like container with optional hover effects and background image.

**Props:**
- `children: ReactNode`
- `hover?: boolean` - Enable hover scale effect
- `imageUrl?: string` - Background image URL
- `imageAlt?: string` - Image alt text
- `className?: string`

**Usage:**
```tsx
<Tile hover imageUrl="/image.jpg">
  <h3>Card Title</h3>
  <p>Card content</p>
</Tile>
```

**Features:**
- Theme-aware styling
- Optional hover animation
- Optional background image with overlay
- Consistent border radius and padding

---

### Navigation Components

#### Link
Styled anchor element with multiple variants.

**Props:**
- `children: ReactNode`
- `href: string`
- `variant?: LinkVariant` - TEXT | CONTACT | FOOTER | PRIMARY
- `target?: string`
- `rel?: string`
- `className?: string`

**Variants:**
- `TEXT` - Underline animation on hover
- `CONTACT` - Styled for contact cards
- `FOOTER` - Muted footer links
- `PRIMARY` - Bold primary links

**Usage:**
```tsx
<Link href="#section" variant={LinkVariant.TEXT}>
  Navigate
</Link>
```

---

#### Button
Primary action button with theme support.

**Props:**
- `children: ReactNode`
- `onClick?: () => void`
- `type?: 'button' | 'submit' | 'reset'`
- `variant?: 'default' | 'small'`
- `disabled?: boolean`
- `className?: string`

**Usage:**
```tsx
<Button onClick={handleClick} variant="small">
  Click Me
</Button>
```

**Features:**
- Theme-aware colors
- Hover and active states
- Disabled state styling
- Size variants

---

#### IconButton
Circular button for icons.

**Props:**
- `children: ReactNode` (typically Icon component)
- `onClick?: () => void`
- `href?: string`
- `size?: IconButtonSize` - SMALL | MEDIUM | LARGE
- `target?: string`
- `rel?: string`
- `disabled?: boolean`
- `className?: string`

**Usage:**
```tsx
<IconButton size={IconButtonSize.MEDIUM} onClick={handleClick}>
  <Icon name={IconName.GITHUB} size={IconSize.MD} />
</IconButton>
```

---

### Display Components

#### Icon
SVG icon component with multiple sizes and names.

**Props:**
- `name: IconName` - GITHUB | LINKEDIN | EMAIL | MENU | CLOSE | CHEVRON_UP | CHEVRON_DOWN | CHEVRON_LEFT | CHEVRON_RIGHT
- `size?: IconSize` - XS | SM | MD | LG | XL
- `color?: string`
- `className?: string`

**Usage:**
```tsx
<Icon name={IconName.GITHUB} size={IconSize.LG} />
```

---

#### Text
Typography component with consistent styling.

**Props:**
- `children: ReactNode`
- `as?: TextAs` - P | H1 | H2 | H3 | H4 | H5 | H6 | SPAN | DIV
- `size?: TextSize` - XS | SM | MD | LG | XL | XXL
- `weight?: TextWeight` - NORMAL | MEDIUM | SEMIBOLD | BOLD
- `variant?: TextVariant` - PRIMARY | SECONDARY | MUTED | ACCENT
- `align?: Alignment` - LEFT | CENTER | RIGHT
- `className?: string`

**Usage:**
```tsx
<Text as={TextAs.H2} size={TextSize.XL} weight={TextWeight.BOLD}>
  Heading Text
</Text>
```

---

#### SectionTitle
Standardized section heading with gradient effect.

**Props:**
- `children: ReactNode`
- `className?: string`

**Usage:**
```tsx
<SectionTitle>About Me</SectionTitle>
```

**Features:**
- Gradient text effect from theme
- Consistent sizing and spacing
- Responsive font size

---

#### Tag
Small label component for technologies, dates, etc.

**Props:**
- `children: ReactNode`
- `variant?: TagVariant` - PRIMARY | SECONDARY | ACCENT | NEUTRAL | DATE
- `className?: string`

**Usage:**
```tsx
<Tag variant={TagVariant.PRIMARY}>React</Tag>
```

---

#### TagGroup
Renders a collection of tags.

**Props:**
- `items: string[]`
- `variant?: TagVariant`
- `className?: string`

**Usage:**
```tsx
<TagGroup items={['React', 'TypeScript', 'Tailwind']} variant={TagVariant.NEUTRAL} />
```

---

### Form Components

#### Input
Text input field with label and theme styling.

**Props:**
- `id: string`
- `name: string`
- `value: string`
- `onChange: (e: ChangeEvent<HTMLInputElement>) => void`
- `type?: string` - Default 'text'
- `label: string`
- `placeholder?: string`
- `required?: boolean`
- `className?: string`

**Usage:**
```tsx
<Input
  id="email"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  label="Email"
  placeholder="your@email.com"
  required
/>
```

---

#### Textarea
Multi-line text input.

**Props:**
- `id: string`
- `name: string`
- `value: string`
- `onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void`
- `label: string`
- `placeholder?: string`
- `rows?: number`
- `required?: boolean`
- `className?: string`

**Usage:**
```tsx
<Textarea
  id="message"
  name="message"
  value={formData.message}
  onChange={handleChange}
  label="Message"
  rows={5}
/>
```

---

#### Select
Dropdown selection component.

**Props:**
- `value: string`
- `onChange: (value: string) => void`
- `options: SelectOption[]`
- `className?: string`

**Usage:**
```tsx
<Select
  value={theme}
  onChange={setTheme}
  options={[
    { value: 'sunset', label: 'Sunset' },
    { value: 'cosmos', label: 'Cosmos' }
  ]}
/>
```

---

#### ToggleButtonGroup
Group of toggle buttons for single selection.

**Props:**
- `options: ToggleOption[]`
- `value: string`
- `onChange: (value: string) => void`
- `className?: string`

**Usage:**
```tsx
<ToggleButtonGroup
  value={language}
  onChange={setLanguage}
  options={[
    { value: 'pl', label: 'PL' },
    { value: 'en', label: 'EN' }
  ]}
/>
```

---

### Complex Components

#### Collapsible
Expandable container with smooth height transition.

**Props:**
- `isOpen: boolean`
- `children: ReactNode`
- `className?: string`

**Usage:**
```tsx
<Collapsible isOpen={isExpanded}>
  <List items={details} />
</Collapsible>
```

---

#### ExpandableGrid
Responsive grid that shows one row initially, expandable to show all.

**Props:**
- `items: T[]`
- `columns: ResponsiveConfig` - { mobile, tablet, desktop }
- `gap?: ResponsiveConfig`
- `isExpanded: boolean`
- `visibleCount?: number`
- `renderItem: (item: T, index: number, isVisible: boolean) => ReactNode`
- `className?: string`
- `duration?: number`

**Usage:**
```tsx
<ExpandableGrid
  items={projects}
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  gap={{ mobile: 4, tablet: 6, desktop: 8 }}
  isExpanded={isExpanded}
  visibleCount={visibleCount}
  renderItem={(project, index, isVisible) => (
    <ProjectCard {...project} isVisible={isVisible} />
  )}
/>
```

**Features:**
- Measures first row height dynamically
- Responsive columns
- Smooth expand/collapse animation
- Overflow control

---

#### Carousel
Slideshow component with navigation and dots.

**Props:**
- `children: ReactNode` (CarouselItem components)
- `padding?: string`
- `minHeight?: string`
- `showDots?: boolean`
- `showNavigation?: boolean`
- `duration?: number` - Transition duration in ms
- `className?: string`

**Usage:**
```tsx
<Carousel padding="px-4" minHeight="320px">
  <CarouselItem>
    <FactCard fact={fact1} />
  </CarouselItem>
  <CarouselItem>
    <FactCard fact={fact2} />
  </CarouselItem>
</Carousel>
```

**Features:**
- Swipeable slides
- Navigation arrows (hidden on mobile)
- Progress dots
- Smooth transitions

---

#### Timeline
Vertical timeline with gradient line.

**Props:**
- `children: ReactNode` (TimelineItem components)
- `className?: string`
- `align?: Alignment` - LEFT | RIGHT

**Usage:**
```tsx
<Timeline align={Alignment.LEFT}>
  <TimelineItem>
    <ExperienceCard {...experience} />
  </TimelineItem>
</Timeline>
```

**Features:**
- Gradient vertical line
- Dot indicators
- Left/right alignment
- Responsive width

---

#### List
Bulleted or numbered list with custom styling.

**Props:**
- `items: string[]`
- `bullet?: ReactNode` - Custom bullet component
- `contentVariant?: TextVariant`
- `size?: TextSize`
- `className?: string`

**Usage:**
```tsx
<List
  items={['Item 1', 'Item 2', 'Item 3']}
  bullet={<Icon name={IconName.CHEVRON_RIGHT} size={IconSize.XS} />}
  contentVariant={TextVariant.SECONDARY}
  size={TextSize.SM}
/>
```

---

#### Toast
Notification component with multiple variants.

**Props:**
- `message: string`
- `variant?: ToastVariant` - SUCCESS | ERROR | INFO | WARNING
- `duration?: number` - Auto-hide duration in ms
- `onClose: () => void`

**Usage:**
```tsx
// Use via useToast hook
const { showToast, ToastComponent } = useToast();

showToast('Success!', ToastVariant.SUCCESS);

return <ToastComponent />;
```

---

#### CodeEditor
Syntax-highlighted code display.

**Props:**
- `code: string`
- `className?: string`

**Usage:**
```tsx
<CodeEditor code={`const greeting = "Hello World";`} />
```

---

## Hooks

### useButton
Provides button state management and styling.

**Returns:**
- `computedClassName: string`
- `isDisabled: boolean`
- `handleClick: () => void`
- `handleMouseEnter: () => void`
- `handleMouseLeave: () => void`
- `style: CSSProperties`

**Usage:**
Used internally by Button and IconButton components.

---

### useMediaQuery
Detects media query matches reactively.

**Parameters:**
- `query: string` - CSS media query

**Returns:**
- `boolean` - Whether query matches

**Usage:**
```tsx
const isDesktop = useMediaQuery('(min-width: 1024px)');
const isTablet = useMediaQuery('(min-width: 768px)');

const visibleCount = isDesktop ? 3 : isTablet ? 2 : 1;
```

---

### useScrollReveal
Triggers fade-in animation on scroll into view.

**Parameters:**
- `options?: { delay?: number }` - Animation delay in ms

**Returns:**
- `elementRef: RefObject<HTMLElement>`
- `className: string` - Animation classes

**Usage:**
```tsx
const { elementRef, className } = useScrollReveal({ delay: 200 });

return (
  <section ref={elementRef} className={className}>
    Content
  </section>
);
```

---

### useScrollToTop
Provides scroll-to-top button with visibility control.

**Returns:**
- `ReactNode` - Rendered button element

**Usage:**
```tsx
const ScrollToTopButton = useScrollToTop();

return (
  <Layout>
    {children}
    {ScrollToTopButton}
  </Layout>
);
```

**Features:**
- Appears when scrolled past 300px
- Smooth scroll to top
- Fade and slide animations

---

### useToggleWithScroll
Toggle state with scroll-to-element on collapse.

**Parameters:**
- `elementRef: RefObject<HTMLElement>`
- `options?: { scrollDelay?, scrollBehavior?, scrollBlock? }`

**Returns:**
- `isExpanded: boolean`
- `handleToggle: () => void`

**Usage:**
```tsx
const elementRef = useRef<HTMLElement>(null);
const { isExpanded, handleToggle } = useToggleWithScroll(elementRef);

return (
  <section ref={elementRef}>
    <ExpandableGrid isExpanded={isExpanded} />
    <Button onClick={handleToggle}>
      {isExpanded ? 'Show Less' : 'Show More'}
    </Button>
  </section>
);
```

---

### useToast
Provides toast notification functionality.

**Returns:**
- `showToast: (message: string, variant?: ToastVariant) => void`
- `ToastComponent: ReactNode`

**Usage:**
```tsx
const { showToast, ToastComponent } = useToast();

const handleSuccess = () => {
  showToast('Form submitted successfully!', ToastVariant.SUCCESS);
};

return (
  <>
    <ToastComponent />
    <Button onClick={handleSuccess}>Submit</Button>
  </>
);
```

---

## Themes

### ThemeProvider
Context provider for theme management.

**Usage:**
```tsx
import { ThemeProvider } from './design-system/themes';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

---

### useTheme
Access current theme and theme controls.

**Returns:**
- `currentTheme: Theme` - Active theme object
- `themes: Theme[]` - Available themes
- `setTheme: (id: string) => void`

**Usage:**
```tsx
const { currentTheme, themes, setTheme } = useTheme();

<div style={{ backgroundColor: currentTheme.colors.neutral.bg }}>
  <Select
    value={currentTheme.id}
    onChange={setTheme}
    options={themes.map(t => ({ value: t.id, label: t.name }))}
  />
</div>
```

---

### Available Themes

#### Sunset
Warm orange and purple gradient theme with firefly animations.

**Colors:**
- Primary: Orange (#FF6B35)
- Secondary: Purple (#9B59B6)
- Gradients: Sunset-inspired

---

#### Cosmos
Cool blue and purple space theme with stars animation.

**Colors:**
- Primary: Blue (#3498DB)
- Secondary: Deep purple (#8E44AD)
- Gradients: Galaxy-inspired

---

### Theme Structure

```typescript
interface Theme {
  id: string;
  name: string;
  background: ComponentType<{ variant?: any }>;
  colors: {
    primary: {
      text: string;
      bg: string;
      border: string;
      borderHover: string;
      glow: string;
    };
    secondary: { ... };
    neutral: { ... };
    text: { ... };
    gradient: {
      title: string;
    };
  };
}
```

---

## Tokens

### Alignment
```typescript
enum Alignment {
  LEFT = 'text-left',
  CENTER = 'text-center',
  RIGHT = 'text-right'
}
```

### Radius
```typescript
const radius = {
  tile: 'rounded-xl',
  button: 'rounded-full'
};
```

---

## Utils

### Animations

#### fadeIn
```typescript
fadeIn({ duration?: number, delay?: number }): CSSProperties
```

Creates fade-in animation style.

**Usage:**
```tsx
<div style={fadeIn({ duration: 0.6, delay: 0.2 })}>
  Content
</div>
```

---

#### fadeInStagger
```typescript
fadeInStagger(index: number, { staggerDelay?: number, duration?: number }): CSSProperties
```

Creates staggered fade-in animation for list items.

**Usage:**
```tsx
{items.map((item, index) => (
  <div key={index} style={fadeInStagger(index, { staggerDelay: 0.1 })}>
    {item}
  </div>
))}
```

---

#### slideInRight
```typescript
slideInRight({ duration?: number, delay?: number }): CSSProperties
```

Slide in from right animation.

---

#### slideOutRight
```typescript
slideOutRight({ duration?: number }): CSSProperties
```

Slide out to right animation.

---

## Best Practices

### Component Usage

1. **Always use design-system components** instead of raw HTML
2. **Use Container** for all section wrappers
3. **Use Text component** instead of `<p>`, `<h1>`, etc.
4. **Apply theme colors** via `useTheme` hook

### Responsive Design

1. Use **responsive configs** for grids: `{ mobile, tablet, desktop }`
2. Use **useMediaQuery** for conditional logic
3. Test on all breakpoints: <768px (mobile), 768-1024px (tablet), >1024px (desktop)

### Performance

1. **Avoid inline styles** when possible
2. Use **CSS transitions** over JavaScript animations
3. **Memoize expensive computations** in custom components

### Accessibility

1. Always provide **aria-label** for icon-only buttons
2. Use **semantic HTML** via Text `as` prop
3. Ensure **keyboard navigation** works
4. Maintain **sufficient color contrast**

---

## Migration Guide

### From Raw HTML to Design System

**Before:**
```tsx
<div className="container mx-auto px-6">
  <h2 className="text-3xl font-bold mb-4">Title</h2>
  <p className="text-gray-600">Description</p>
  <button onClick={handleClick}>Click</button>
</div>
```

**After:**
```tsx
<Container>
  <Text as={TextAs.H2} size={TextSize.XL} weight={TextWeight.BOLD} className="mb-4">
    Title
  </Text>
  <Text variant={TextVariant.MUTED}>
    Description
  </Text>
  <Button onClick={handleClick}>Click</Button>
</Container>
```

---

## Contributing

When adding new components:

1. Create component folder: `components/ComponentName/`
2. Include: `ComponentName.tsx`, `ComponentName.types.ts`, `index.ts`
3. Export from `components/index.ts`
4. Update this documentation
5. Ensure theme compatibility
6. Add TypeScript types
7. Test responsive behavior

---

## Support

For questions or issues with the design system, please refer to this documentation or contact the development team.

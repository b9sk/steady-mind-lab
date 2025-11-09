# Development Guide

Guidelines and best practices for developing the Attention Training App.

## Table of Contents

- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Component Guidelines](#component-guidelines)
- [TypeScript Best Practices](#typescript-best-practices)
- [Styling Guidelines](#styling-guidelines)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Common Tasks](#common-tasks)

## Development Workflow

### Starting Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install dependencies (if package.json changed)
npm install

# 3. Start dev server
npm run dev
```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes**
   - Edit files in `src/`
   - Test in browser (auto-refreshes)

3. **Check for errors**
   - Browser console
   - Terminal for build errors
   - TypeScript errors in editor

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Add feature: description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/my-feature
   ```

### Hot Module Replacement (HMR)

Vite provides instant updates:
- Component changes → instant refresh
- CSS changes → no refresh needed
- State preserved during updates

## Code Style

### General Rules

- ✅ Use TypeScript (no `.js` or `.jsx`)
- ✅ Use functional components (no class components)
- ✅ Use hooks for state and effects
- ✅ Keep components small and focused
- ✅ Extract reusable logic to custom hooks
- ✅ Use meaningful variable names

### Naming Conventions

```typescript
// Components: PascalCase
const ExerciseCard = () => { ... }

// Functions: camelCase
const handleClick = () => { ... }

// Constants: UPPER_SNAKE_CASE
const INHALE_DURATION = 4;

// Types/Interfaces: PascalCase
interface ExerciseSession { ... }

// Files: match export name
ExerciseCard.tsx
use-wake-lock.ts
```

### File Organization

```typescript
// 1. Imports - external first, then internal
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useWakeLock } from "@/hooks/use-wake-lock";

// 2. Types/Interfaces
interface Props {
  onComplete: () => void;
}

// 3. Constants
const DURATION = 300;

// 4. Component
export const Component = ({ onComplete }: Props) => {
  // 4a. Hooks
  const [state, setState] = useState(false);
  useWakeLock();
  
  // 4b. Effects
  useEffect(() => { ... }, []);
  
  // 4c. Handlers
  const handleClick = () => { ... };
  
  // 4d. Render
  return <div>...</div>;
};
```

## Component Guidelines

### Creating a New Component

1. **Determine location**
   - `components/` - reusable UI components
   - `components/exercises/` - exercise-specific
   - `pages/` - route-level pages

2. **Create file**
   ```bash
   touch src/components/MyComponent.tsx
   ```

3. **Basic structure**
   ```tsx
   import { useState } from "react";
   
   interface MyComponentProps {
     title: string;
     onAction?: () => void;
   }
   
   export const MyComponent = ({ title, onAction }: MyComponentProps) => {
     return (
       <div>
         <h2>{title}</h2>
       </div>
     );
   };
   ```

### Props Best Practices

```typescript
// ✅ Good - typed props with defaults
interface Props {
  title: string;
  duration?: number;
  onComplete?: () => void;
}

export const Component = ({ 
  title, 
  duration = 300,
  onComplete 
}: Props) => { ... }

// ❌ Bad - any types, no defaults
export const Component = (props: any) => { ... }
```

### State Management

```typescript
// ✅ Good - descriptive names, proper types
const [isPlaying, setIsPlaying] = useState<boolean>(false);
const [timeLeft, setTimeLeft] = useState<number>(duration);

// ❌ Bad - unclear names, missing types
const [flag, setFlag] = useState(false);
const [time, setTime] = useState(300);
```

### useEffect Best Practices

```typescript
// ✅ Good - specific dependencies
useEffect(() => {
  if (!isPlaying) return;
  
  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);
  
  return () => clearInterval(timer);
}, [isPlaying]); // Only re-run when isPlaying changes

// ❌ Bad - missing dependencies or cleanup
useEffect(() => {
  setInterval(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);
}); // Missing cleanup, dependency issues
```

## TypeScript Best Practices

### Type Definitions

```typescript
// ✅ Good - explicit types
interface Exercise {
  id: string;
  title: string;
  duration: number;
  benefits: string[];
}

const exercise: Exercise = { ... };

// ❌ Bad - implicit any
const exercise = { ... };
```

### Avoid `any`

```typescript
// ✅ Good - specific types
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
};

// ❌ Bad - using any
const handleChange = (event: any) => {
  const value = event.target.value;
};
```

### Type vs Interface

```typescript
// Use interface for objects
interface User {
  name: string;
  age: number;
}

// Use type for unions, primitives
type Status = 'idle' | 'loading' | 'success' | 'error';
type ID = string | number;
```

### Optional Properties

```typescript
interface Props {
  required: string;
  optional?: number;      // May be undefined
  callback?: () => void;  // May be undefined
}

// Usage
const Component = ({ required, optional = 10 }: Props) => { ... }
```

## Styling Guidelines

### Use Design Tokens

```tsx
// ✅ Good - semantic tokens
<div className="bg-background text-foreground border-border">
<Button className="bg-primary text-primary-foreground">

// ❌ Bad - hardcoded colors
<div className="bg-white text-black border-gray-300">
<Button className="bg-blue-500 text-white">
```

### Responsive Design

```tsx
// ✅ Good - mobile-first
<div className="p-4 md:p-6 lg:p-8">
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// ❌ Bad - desktop-only
<div className="p-8">
<h1 className="text-4xl">
```

### Component Variants

Use `class-variance-authority` for variants:

```tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Conditional Classes

```tsx
import { cn } from "@/lib/utils";

// ✅ Good - use cn() utility
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isPrimary && "primary-classes"
)}>

// ❌ Bad - manual string concatenation
<div className={`base-classes ${isActive ? 'active' : ''}`}>
```

## Testing

### Manual Testing Checklist

Before committing:
- [ ] Test on desktop
- [ ] Test on mobile (Chrome DevTools mobile view)
- [ ] Test all interactive elements
- [ ] Check console for errors
- [ ] Test with different languages
- [ ] Test pause/resume functionality

### Browser Testing

Recommended browsers:
- Chrome (primary)
- Firefox
- Safari (if available)
- Mobile Safari (if available)

### Common Issues

1. **Timer not working**
   - Check useEffect dependencies
   - Ensure cleanup function clears interval

2. **Translation missing**
   - Check all locale files have the key
   - Verify i18n configuration

3. **Styling broken on mobile**
   - Check responsive classes
   - Test in mobile viewport

## Git Workflow

### Branch Naming

```bash
feature/add-new-exercise    # New feature
fix/timer-bug               # Bug fix
refactor/improve-state      # Code improvement
docs/update-readme          # Documentation
```

### Commit Messages

```bash
# ✅ Good commits
git commit -m "Add sound meditation exercise"
git commit -m "Fix timer pause bug in breathing exercise"
git commit -m "Refactor storage utilities for better types"

# ❌ Bad commits
git commit -m "update"
git commit -m "fix stuff"
git commit -m "wip"
```

### Before Pushing

```bash
# 1. Check status
git status

# 2. Review changes
git diff

# 3. Ensure no build errors
npm run build

# 4. Push
git push origin your-branch
```

## Common Tasks

### Adding a New Exercise

1. **Add to exercises data**
   ```typescript
   // src/data/exercises.ts
   {
     id: "new-exercise",
     title: "New Exercise",
     description: "Description",
     icon: "IconName",
     duration: 300,
     benefits: ["Benefit 1", "Benefit 2"]
   }
   ```

2. **Create component**
   ```bash
   touch src/components/exercises/NewExercise.tsx
   ```

3. **Implement component**
   ```tsx
   interface NewExerciseProps {
     onComplete: () => void;
     duration?: number;
   }
   
   export const NewExercise = ({ onComplete, duration = 300 }) => {
     useWakeLock();
     // ... implementation
   };
   ```

4. **Add translations**
   ```json
   // src/i18n/locales/en.json
   "newExercise": {
     "instruction": "...",
     "pause": "Pause",
     "continue": "Continue"
   }
   ```
   
   Repeat for ES, RU, ZH.

5. **Update Exercise page**
   ```tsx
   // src/pages/Exercise.tsx
   import { NewExercise } from "@/components/exercises/NewExercise";
   
   case "new-exercise":
     return <NewExercise onComplete={handleComplete} />;
   ```

### Modifying Design Tokens

1. **Edit CSS variables**
   ```css
   /* src/index.css */
   :root {
     --new-color: 210 40% 96%;
   }
   ```

2. **Add to Tailwind config**
   ```typescript
   // tailwind.config.ts
   theme: {
     extend: {
       colors: {
         'new-color': 'hsl(var(--new-color))'
       }
     }
   }
   ```

3. **Use in components**
   ```tsx
   <div className="bg-new-color">
   ```

### Adding a Translation Key

1. **Add to all locale files**
   ```json
   // en.json
   "section": {
     "newKey": "English text"
   }
   
   // es.json
   "section": {
     "newKey": "Texto en español"
   }
   
   // ru.json
   "section": {
     "newKey": "Текст на русском"
   }
   
   // zh.json
   "section": {
     "newKey": "中文文本"
   }
   ```

2. **Use in component**
   ```tsx
   const { t } = useTranslation();
   return <p>{t('section.newKey')}</p>;
   ```

### Debugging Tips

1. **Component not rendering**
   - Check for TypeScript errors
   - Verify import paths
   - Check console for errors

2. **Styles not applying**
   - Verify Tailwind classes are correct
   - Check design token exists
   - Inspect element in DevTools

3. **State not updating**
   - Check useEffect dependencies
   - Verify state setter is called
   - Use React DevTools to inspect state

4. **Translation not showing**
   - Verify key exists in all locales
   - Check i18n configuration
   - Test with different languages

## Performance Tips

- Avoid inline function definitions in JSX
- Use `useCallback` for callbacks passed to children
- Use `useMemo` for expensive calculations
- Lazy load routes if needed
- Optimize images (use WebP)

## Code Review Checklist

Before submitting PR:
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Follows code style guide
- [ ] Uses design tokens
- [ ] Responsive on mobile
- [ ] All translations added
- [ ] Meaningful commit messages
- [ ] Tested manually

---

For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md).  
For feature descriptions, see [FEATURES.md](./FEATURES.md).

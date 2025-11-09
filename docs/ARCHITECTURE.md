# Architecture

This document describes the architecture, patterns, and design decisions of the Attention Training App.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling System](#styling-system)
- [Internationalization](#internationalization)

## Overview

The app follows a component-based architecture using React with TypeScript. It's a single-page application (SPA) with client-side routing and local storage for persistence.

### Architecture Principles

1. **Component Composition**: Small, reusable components
2. **Type Safety**: Full TypeScript coverage
3. **Separation of Concerns**: Logic, UI, and data separated
4. **Design System**: Consistent styling through tokens
5. **Progressive Enhancement**: Core features work without JS

## Technology Stack

### Core

- **React 18** - UI library with modern hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management

### Routing & State

- **React Router v6** - Client-side routing
- **React Query** - Async state management
- **Local Storage** - Persistence layer

### Internationalization

- **i18next** - Translation framework
- **react-i18next** - React bindings
- **i18next-browser-languagedetector** - Auto language detection

## Project Structure

```
src/
├── components/
│   ├── exercises/           # Exercise implementations
│   │   ├── BreathingExercise.tsx
│   │   ├── VisualFocusExercise.tsx
│   │   ├── SoundMeditationExercise.tsx
│   │   └── MindfulObservationExercise.tsx
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── ExerciseCard.tsx     # Exercise preview card
│   ├── ProgressStats.tsx    # Progress display
│   ├── NavLink.tsx          # Navigation link
│   └── SEOHead.tsx          # SEO meta tags
├── data/
│   └── exercises.ts         # Exercise definitions
├── hooks/
│   ├── use-wake-lock.ts     # Screen wake lock
│   ├── use-mobile.tsx       # Mobile detection
│   └── use-toast.ts         # Toast notifications
├── i18n/
│   ├── config.ts            # i18n configuration
│   └── locales/             # Translation files
│       ├── en.json
│       ├── es.json
│       ├── ru.json
│       └── zh.json
├── lib/
│   ├── storage.ts           # localStorage utilities
│   └── utils.ts             # Helper functions
├── pages/
│   ├── Home.tsx             # Homepage
│   ├── Exercise.tsx         # Exercise session
│   └── NotFound.tsx         # 404 page
├── types/
│   └── exercise.ts          # Type definitions
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── index.css                # Global styles & design tokens
```

## Design Patterns

### Component Pattern

Each exercise follows this pattern:

```tsx
interface ExerciseProps {
  onComplete: () => void;
  duration?: number;
}

export const ExerciseName = ({ onComplete, duration = 300 }: ExerciseProps) => {
  // 1. Hooks (wake lock, translation, state)
  useWakeLock();
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  // 2. Effects (timers, cleanup)
  useEffect(() => {
    // Timer logic
  }, [dependencies]);

  // 3. Render
  return (
    <Card>
      {/* Exercise UI */}
    </Card>
  );
};
```

### Custom Hooks Pattern

Custom hooks encapsulate reusable logic:

```tsx
// hooks/use-wake-lock.ts
export const useWakeLock = () => {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  
  useEffect(() => {
    // Request wake lock
    return () => {
      // Release on unmount
    };
  }, []);
};
```

### Storage Pattern

All localStorage operations abstracted:

```tsx
// lib/storage.ts
export const saveSessions = (sessions: ExerciseSession[]) => { ... }
export const loadSessions = (): ExerciseSession[] => { ... }
export const addSession = (session: ExerciseSession) => { ... }
export const getTodaySessions = (): ExerciseSession[] => { ... }
```

## State Management

### Local State

- Component-level state with `useState`
- Used for UI state (pause, time remaining)

### Persistent State

- `localStorage` for session history
- Wrapper functions in `lib/storage.ts`
- Type-safe with TypeScript interfaces

### Global State

- React Query for async operations (future)
- i18next for language state

### State Flow

```
User Action → Component State Update → useEffect Trigger → Timer/Logic Update → UI Re-render
                                    ↓
                          Save to localStorage (if needed)
```

## Routing

### Route Structure

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/exercise/:id" element={<Exercise />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Dynamic Routes

Exercise page uses URL parameter:

```tsx
// pages/Exercise.tsx
const { id } = useParams<{ id: string }>();
const exercise = exercises.find(e => e.id === id);
```

### Navigation

```tsx
// Navigate programmatically
const navigate = useNavigate();
navigate('/exercise/breathing-478');

// Or use Link component
<Link to={`/exercise/${exercise.id}`}>
  Start Exercise
</Link>
```

## Styling System

### Design Tokens

All colors defined as CSS variables in `src/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... more tokens */
}
```

### Tailwind Integration

Tokens mapped in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
    }
  }
}
```

### Component Styling

Use semantic tokens, not direct colors:

```tsx
// ✅ Good - uses design tokens
<div className="bg-background text-foreground border-border">

// ❌ Bad - hardcoded colors
<div className="bg-white text-black border-gray-300">
```

### Responsive Design

Mobile-first with Tailwind breakpoints:

```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  {/* 2xl on mobile, 3xl on tablet, 4xl on desktop */}
</h1>
```

## Internationalization

### Setup

i18n initialized in `src/main.tsx`:

```tsx
import './i18n/config';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### Configuration

```tsx
// i18n/config.ts
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, es, ru, zh },
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });
```

### Usage in Components

```tsx
const { t } = useTranslation();

return (
  <h1>{t('app.title')}</h1>
);
```

Translation keys reference JSON structure:

```json
{
  "app": {
    "title": "Attention Training"
  }
}
```

### Language Detection

1. Browser language (`navigator.language`)
2. HTML lang attribute
3. localStorage cache
4. Fallback to English

## Data Flow

### Exercise Session Flow

```
1. User clicks exercise card on Home page
   ↓
2. Navigate to /exercise/:id
   ↓
3. Exercise component loads
   ↓
4. useWakeLock() prevents screen sleep
   ↓
5. Timer starts counting down
   ↓
6. User completes or manually finishes
   ↓
7. Session saved to localStorage
   ↓
8. Navigate back to Home
   ↓
9. ProgressStats updates
```

### Storage Schema

```typescript
interface ExerciseSession {
  exerciseId: string;
  date: string;          // ISO format
  duration: number;      // seconds
  completed: boolean;
}

// Stored as JSON array in localStorage
// Key: "attention_sessions"
```

## Performance Considerations

### Code Splitting

Vite automatically splits code by route.

### Lazy Loading

Future consideration for exercise components:

```tsx
const BreathingExercise = lazy(() => 
  import('./components/exercises/BreathingExercise')
);
```

### Wake Lock

Prevents screen sleep during exercises:
- Requested on exercise mount
- Released on unmount
- Graceful fallback if unsupported

### Animations

CSS animations via Tailwind:

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Browser APIs Used

- **Wake Lock API** - Prevent screen sleep
- **localStorage** - Persist sessions
- **Navigator.language** - Auto-detect language
- **Web Audio API** (future) - Sound exercises

## Future Architecture Considerations

- **Backend Integration**: Supabase for cloud sync
- **Authentication**: User accounts
- **Analytics**: Track usage patterns
- **Push Notifications**: Reminders
- **Service Worker**: Offline support
- **Web Audio**: Ambient sounds

See [FEATURES.md](./FEATURES.md) for detailed feature descriptions.

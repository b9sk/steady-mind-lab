# Features

Detailed description of all features in the Attention Training App.

## Table of Contents

- [Exercises](#exercises)
- [Progress Tracking](#progress-tracking)
- [Multi-language Support](#multi-language-support)
- [Wake Lock](#wake-lock)
- [Responsive Design](#responsive-design)
- [UI Components](#ui-components)

## Exercises

### 1. Breathing 4-7-8

**Duration**: 5 minutes (300 seconds)  
**Purpose**: Stress reduction and nervous system regulation

#### How It Works

1. **Inhale** for 4 seconds
2. **Hold** breath for 7 seconds
3. **Exhale** for 8 seconds
4. Repeat cycle

#### Implementation Details

```typescript
// components/exercises/BreathingExercise.tsx
const INHALE = 4;
const HOLD = 7;
const EXHALE = 8;
const CYCLE_DURATION = INHALE + HOLD + EXHALE; // 19 seconds
```

#### Visual Feedback

- Animated circle grows/shrinks with breathing
- Phase text ("Inhale", "Hold", "Exhale")
- Progress bar
- Countdown timer

#### Benefits

- Reduces stress and anxiety
- Calms nervous system
- Improves sleep quality
- Enhances concentration

---

### 2. Visual Focus

**Duration**: 3 minutes (180 seconds)  
**Purpose**: Sustained attention training

#### How It Works

1. Focus on the eye icon
2. Maintain attention without distraction
3. Notice when mind wanders
4. Gently return focus

#### Implementation Details

```typescript
// components/exercises/VisualFocusExercise.tsx
const [timeLeft, setTimeLeft] = useState(duration);
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (isPaused || timeLeft <= 0) {
    if (timeLeft <= 0) onComplete();
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [isPaused, timeLeft, onComplete]);
```

#### Visual Elements

- Central eye icon (static focus point)
- Timer display
- Progress bar
- Pause/Continue controls

#### Benefits

- Develops sustained attention
- Improves visual concentration
- Trains focus retention
- Enhances mindfulness

---

### 3. Sound Meditation

**Duration**: 5 minutes (300 seconds)  
**Purpose**: Auditory awareness development

#### How It Works

1. Close eyes or soften gaze
2. Listen to ambient sounds
3. Notice different sound layers
4. Observe without judgment

#### Implementation Details

```typescript
// components/exercises/SoundMeditationExercise.tsx
// Similar timer structure to Visual Focus
// Future: Will integrate Web Audio API for ambient sounds
```

#### Current Features

- Timer countdown
- Pause/resume functionality
- Progress tracking
- Guided instructions

#### Planned Enhancements

- Ambient sound options (rain, forest, ocean)
- Volume control
- Sound mixing

#### Benefits

- Develops auditory attention
- Improves detail perception
- Calms the mind
- Trains present-moment awareness

---

### 4. Mindful Observation

**Duration**: 10 minutes (600 seconds)  
**Purpose**: Meta-cognitive awareness training

#### How It Works

1. Observe thoughts and sensations
2. Notice without reacting
3. Prompts cycle every 30 seconds
4. Return to awareness when distracted

#### Implementation Details

```typescript
// components/exercises/MindfulObservationExercise.tsx
const prompts = [
  'mindfulObservation.prompt1',
  'mindfulObservation.prompt2',
  // ... more prompts
];

const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

// Separate effect for prompt cycling
useEffect(() => {
  const promptTimer = setInterval(() => {
    setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
  }, 30000); // 30 seconds

  return () => clearInterval(promptTimer);
}, []);
```

#### Prompt System

Prompts rotate every **30 seconds** in a continuous cycle:
1. "Observe your breathing"
2. "Notice sounds around you"
3. "Feel sensations in your body"
4. "Observe thoughts passing"
5. "Notice emotions present"
6. "Return to present moment"
7. Back to prompt 1...

#### Visual Design

- Central brain icon
- Rotating prompts with fade transitions
- Timer and progress
- Calm color scheme

#### Benefits

- Develops meta-cognitive skills
- Improves emotional regulation
- Reduces impulsivity
- Enhances overall mindfulness

---

## Progress Tracking

### Session Storage

All completed exercises are saved locally:

```typescript
interface ExerciseSession {
  exerciseId: string;    // e.g., "breathing-478"
  date: string;          // ISO 8601 format
  duration: number;      // in seconds
  completed: boolean;    // true if finished, false if stopped early
}
```

### Storage Functions

```typescript
// lib/storage.ts
saveSessions(sessions: ExerciseSession[])
loadSessions(): ExerciseSession[]
addSession(session: ExerciseSession)
getTodaySessions(): ExerciseSession[]
getTotalSessions(): number
```

### Statistics Display

**ProgressStats Component** shows:
- Total sessions completed
- Sessions today
- Current streak (future)

```tsx
<ProgressStats />
```

### Future Enhancements

- Weekly/monthly statistics
- Streak tracking
- Time spent per exercise
- Charts and graphs
- Goal setting

---

## Multi-language Support

### Supported Languages

1. 🇬🇧 **English** (default)
2. 🇪🇸 **Spanish** (Español)
3. 🇷🇺 **Russian** (Русский)
4. 🇨🇳 **Chinese** (中文简体)

### Auto-Detection

Language is automatically detected from:
1. Browser language setting
2. System preferences
3. Falls back to English if unsupported

### Translation Structure

```
src/i18n/locales/
├── en.json  # English translations
├── es.json  # Spanish translations
├── ru.json  # Russian translations
└── zh.json  # Chinese translations
```

### Translation Keys

Organized by section:

```json
{
  "app": {
    "title": "...",
    "subtitle": "..."
  },
  "home": {
    "exercises": "...",
    "infoText": "..."
  },
  "breathing": {
    "inhale": "...",
    "hold": "...",
    "exhale": "..."
  }
  // ... more sections
}
```

### Usage in Code

```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();
  
  return <h1>{t('app.title')}</h1>;
};
```

### Adding New Languages

1. Create `src/i18n/locales/[code].json`
2. Add to `src/i18n/config.ts`:

```typescript
import newLang from './locales/[code].json';

const resources = {
  en, es, ru, zh,
  [code]: { translation: newLang }
};
```

See [LOCALIZATION.md](./LOCALIZATION.md) for detailed translation workflow.

---

## Wake Lock

### Purpose

Prevents screen from sleeping during exercises.

### Implementation

```typescript
// hooks/use-wake-lock.ts
export const useWakeLock = () => {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        }
      } catch (err) {
        console.warn("Wake Lock API not supported or failed:", err);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
  }, []);
};
```

### Usage

Every exercise component calls:

```tsx
const ExerciseComponent = () => {
  useWakeLock(); // Prevents screen sleep
  
  // ... rest of component
};
```

### Browser Support

- ✅ Chrome 84+
- ✅ Edge 84+
- ✅ Safari 16.4+
- ✅ Chrome Android 84+
- ❌ Firefox (not yet supported)

Gracefully degrades if not supported.

---

## Responsive Design

### Breakpoints

Using Tailwind's default breakpoints:

```typescript
sm: 640px   // Small devices
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large
```

### Mobile-First Approach

Base styles are for mobile, then enhance:

```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  {/* Mobile: 2xl, Tablet: 3xl, Desktop: 4xl */}
</h1>
```

### Responsive Patterns

#### Container

```tsx
<div className="container max-w-4xl mx-auto px-4 py-4 md:py-6">
  {/* Responsive padding */}
</div>
```

#### Grid

```tsx
<div className="grid gap-4 md:grid-cols-2">
  {/* 1 column mobile, 2 columns tablet+ */}
</div>
```

#### Text

```tsx
<p className="text-sm md:text-base text-muted-foreground">
  {/* Smaller on mobile */}
</p>
```

### Touch Targets

All interactive elements have minimum 44x44px touch target for mobile accessibility.

---

## UI Components

### Component Library

Using **shadcn/ui** - a collection of accessible, customizable components.

### Key Components

#### Button

```tsx
<Button variant="outline" onClick={handleClick}>
  Click Me
</Button>
```

Variants:
- `default` - Primary style
- `outline` - Outlined
- `ghost` - Minimal
- `destructive` - Danger actions

#### Card

```tsx
<Card>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

#### Progress Bar

```tsx
<div className="w-full bg-muted rounded-full h-2">
  <div
    className="bg-primary h-2 rounded-full transition-all"
    style={{ width: `${progress}%` }}
  />
</div>
```

#### Toasts

```tsx
import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();

toast({
  title: "Success!",
  description: "Exercise completed.",
});
```

### Custom Components

#### ExerciseCard

Preview card for each exercise:

```tsx
<ExerciseCard exercise={exercise} />
```

Features:
- Exercise icon
- Title and description
- Duration badge
- Benefits list
- Click to navigate

#### ProgressStats

Displays user progress:

```tsx
<ProgressStats />
```

Shows:
- Total sessions
- Today's sessions
- Visual stats

#### NavLink

Styled navigation link:

```tsx
<NavLink to="/">Home</NavLink>
```

### Icons

Using **Lucide React**:

```tsx
import { Sparkles, Wind, Eye, Music, Brain } from "lucide-react";

<Sparkles className="h-6 w-6 text-primary" />
```

### Animation

CSS animations defined in `index.css`:

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Applied with Tailwind:

```tsx
<div className="animate-fade-in">
  {/* Fades in on mount */}
</div>
```

Staggered animations:

```tsx
<div 
  className="animate-fade-in"
  style={{ animationDelay: `${index * 0.1}s` }}
>
  {/* Delays based on index */}
</div>
```

---

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratio WCAG AA compliant
- Focus indicators visible
- Screen reader friendly

---

## SEO

### Meta Tags

SEOHead component manages meta tags:

```tsx
<SEOHead />
```

Includes:
- Title
- Description
- Viewport
- Language
- Open Graph tags

### Semantic HTML

```tsx
<header>
  <h1>Page Title</h1>
</header>

<main>
  <section>
    <h2>Section Title</h2>
  </section>
</main>
```

---

## Browser Storage

### localStorage Schema

```javascript
{
  "attention_sessions": "[{...}, {...}]",  // Exercise sessions
  "i18nextLng": "en"                       // Selected language
}
```

### Privacy

All data stored locally. No external tracking or analytics.

---

See [DEVELOPMENT.md](./DEVELOPMENT.md) for contributing to these features.

# Getting Started

Welcome to the Attention Training App! This guide will help you set up the project and understand the basics.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Overview](#project-overview)
- [First Steps](#first-steps)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher (comes with Node.js)
- **Git** for version control
- A code editor (VS Code recommended)

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- i18n Ally (for translations)

## Installation

1. **Clone the repository**

```bash
git clone <YOUR_GIT_URL>
cd attention-training-app
```

2. **Install dependencies**

```bash
npm install
```

This will install all required packages including:
- React and React Router
- TypeScript
- Vite (build tool)
- Tailwind CSS
- i18next (localization)
- shadcn/ui components
- And more...

3. **Verify installation**

```bash
npm run dev
```

If successful, you should see:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Running the App

### Development Mode

```bash
npm run dev
```

- Opens at `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- Changes reflect immediately
- Console shows build errors/warnings

### Production Build

```bash
npm run build
```

Creates optimized build in `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally.

## Project Overview

### What This App Does

The Attention Training App provides four mindfulness exercises:

1. **Breathing 4-7-8** (5 min) - Stress reduction breathing technique
2. **Visual Focus** (3 min) - Sustained attention training
3. **Sound Meditation** (5 min) - Auditory awareness practice
4. **Mindful Observation** (10 min) - Meta-cognitive awareness

### Key Features

- ✅ Progress tracking with local storage
- ✅ Multi-language support (EN, ES, RU, ZH)
- ✅ Responsive design (mobile & desktop)
- ✅ Wake Lock API (prevents screen sleep)
- ✅ Timer controls (pause/resume)
- ✅ Daily statistics

## First Steps

### 1. Explore the Codebase

Start by familiarizing yourself with these key files:

```
src/
├── App.tsx              # Main app component & routing
├── pages/
│   ├── Home.tsx         # Homepage with exercise list
│   └── Exercise.tsx     # Exercise session page
├── components/
│   ├── ExerciseCard.tsx # Exercise preview cards
│   └── exercises/       # Exercise implementations
├── data/
│   └── exercises.ts     # Exercise definitions
└── i18n/
    ├── config.ts        # i18n configuration
    └── locales/         # Translation files
```

### 2. Try Making a Small Change

Edit `src/pages/Home.tsx` to see HMR in action:

```tsx
// Change the header subtitle
<p className="text-sm md:text-base text-muted-foreground">
  Your modified subtitle here
</p>
```

Save the file and watch it update instantly in the browser.

### 3. Review the Architecture

Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand:
- Component structure
- State management patterns
- Routing setup
- Design system usage

### 4. Check Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Common Tasks

### Adding a New Exercise

1. Add exercise data to `src/data/exercises.ts`
2. Create component in `src/components/exercises/`
3. Add translations to all locale files
4. Import in `src/pages/Exercise.tsx`

### Adding Translations

1. Add keys to `src/i18n/locales/en.json`
2. Translate to ES, RU, ZH
3. Use in components: `const { t } = useTranslation()`

### Styling Components

- Use Tailwind utility classes
- Reference design tokens from `src/index.css`
- Use semantic color variables (e.g., `bg-primary`, `text-foreground`)

## Getting Help

- **Documentation**: Check other files in `docs/`
- **Code Comments**: Most complex logic is commented
- **Console Errors**: Check browser DevTools console
- **Type Errors**: TypeScript will highlight issues

## Next Steps

- 📖 Read [ARCHITECTURE.md](./ARCHITECTURE.md) for project structure
- 🎨 Review [DEVELOPMENT.md](./DEVELOPMENT.md) for coding guidelines
- 🌍 Check [LOCALIZATION.md](./LOCALIZATION.md) for translation workflow
- ✨ Explore [FEATURES.md](./FEATURES.md) for detailed feature info

Ready to start developing? Head to [DEVELOPMENT.md](./DEVELOPMENT.md)!

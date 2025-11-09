# Localization Guide

Complete guide to working with translations in the Attention Training App.

## Table of Contents

- [Overview](#overview)
- [Supported Languages](#supported-languages)
- [File Structure](#file-structure)
- [Adding Translations](#adding-translations)
- [Using Translations](#using-translations)
- [Translation Guidelines](#translation-guidelines)
- [Testing Translations](#testing-translations)
- [Adding New Languages](#adding-new-languages)

## Overview

The app uses **i18next** for internationalization with automatic language detection based on browser settings.

### Key Features

- 🌍 Auto-detects user's language
- 🔄 Seamless language switching
- 💾 Remembers language preference
- 📱 Supports RTL (future)
- 🎯 Type-safe translation keys

## Supported Languages

| Language | Code | Flag | Status |
|----------|------|------|--------|
| English | `en` | 🇬🇧 | Default |
| Spanish | `es` | 🇪🇸 | Complete |
| Russian | `ru` | 🇷🇺 | Complete |
| Chinese (Simplified) | `zh` | 🇨🇳 | Complete |

## File Structure

```
src/i18n/
├── config.ts           # i18n configuration
└── locales/
    ├── en.json        # English translations
    ├── es.json        # Spanish translations
    ├── ru.json        # Russian translations
    └── zh.json        # Chinese translations
```

### Translation File Structure

Each locale file follows the same JSON structure:

```json
{
  "app": {
    "title": "Attention Training",
    "subtitle": "Develop focus through guided mindfulness exercises"
  },
  "home": {
    "exercises": "Exercises",
    "infoText": "Regular practice improves focus..."
  },
  "breathing": {
    "inhale": "Inhale",
    "hold": "Hold",
    "exhale": "Exhale",
    "pause": "Pause",
    "continue": "Continue"
  }
  // ... more sections
}
```

## Adding Translations

### Step 1: Add Key to English (en.json)

```json
{
  "section": {
    "newKey": "English text here"
  }
}
```

### Step 2: Translate to Other Languages

**Spanish (es.json)**
```json
{
  "section": {
    "newKey": "Texto en español aquí"
  }
}
```

**Russian (ru.json)**
```json
{
  "section": {
    "newKey": "Текст на русском здесь"
  }
}
```

**Chinese (zh.json)**
```json
{
  "section": {
    "newKey": "中文文本在这里"
  }
}
```

### Step 3: Use in Components

```tsx
import { useTranslation } from "react-i18next";

const Component = () => {
  const { t } = useTranslation();
  
  return <p>{t('section.newKey')}</p>;
};
```

## Using Translations

### Basic Usage

```tsx
import { useTranslation } from "react-i18next";

const Component = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('app.subtitle')}</p>
    </div>
  );
};
```

### Nested Keys

```tsx
// Translation file
{
  "exercise": {
    "breathing": {
      "title": "Breathing 4-7-8",
      "instructions": {
        "step1": "Inhale for 4 seconds",
        "step2": "Hold for 7 seconds"
      }
    }
  }
}

// Component
<h2>{t('exercise.breathing.title')}</h2>
<p>{t('exercise.breathing.instructions.step1')}</p>
```

### Variables in Translations

```json
{
  "greeting": "Hello, {{name}}!",
  "sessionsCompleted": "You completed {{count}} sessions"
}
```

```tsx
<p>{t('greeting', { name: 'John' })}</p>
<p>{t('sessionsCompleted', { count: 5 })}</p>
```

### Pluralization

```json
{
  "session_one": "{{count}} session",
  "session_other": "{{count}} sessions"
}
```

```tsx
<p>{t('session', { count: 1 })}</p>  // "1 session"
<p>{t('session', { count: 5 })}</p>  // "5 sessions"
```

### Array Translations

For lists of items:

```json
{
  "benefits": [
    "Reduces stress",
    "Improves focus",
    "Enhances sleep"
  ]
}
```

```tsx
const benefits = t('benefits', { returnObjects: true }) as string[];

<ul>
  {benefits.map((benefit, i) => (
    <li key={i}>{benefit}</li>
  ))}
</ul>
```

## Translation Guidelines

### Writing Good Translations

1. **Be Concise**
   - Keep text short and clear
   - Avoid unnecessary words

2. **Be Consistent**
   - Use same terminology throughout
   - Match tone and style

3. **Consider Context**
   - UI constraints (button labels, etc.)
   - Cultural appropriateness
   - Formal vs informal tone

4. **Mind Character Length**
   - Some languages are longer (German, Russian)
   - Test UI with all languages
   - Allow for text expansion

### Example: Button Labels

```json
// ✅ Good - concise, actionable
{
  "pause": "Pause",
  "continue": "Continue",
  "complete": "Complete"
}

// ❌ Bad - too verbose
{
  "pause": "Pause the exercise temporarily",
  "continue": "Continue with the exercise",
  "complete": "Mark exercise as complete"
}
```

### Cultural Considerations

**Spanish**
- Use neutral Spanish when possible
- Avoid regional slang

**Russian**
- Use formal "вы" or informal "ты" consistently
- This app uses informal tone

**Chinese**
- Use Simplified Chinese (mainland)
- Keep characters simple and common

### Tone Guidelines

| Section | Tone |
|---------|------|
| App title/subtitle | Inspiring, professional |
| Exercise instructions | Calm, directive |
| UI buttons | Clear, action-oriented |
| Benefits | Positive, motivating |

## Testing Translations

### Manual Testing

1. **Change browser language**
   - Chrome: Settings → Languages
   - Firefox: Preferences → Language
   - Safari: System Preferences → Language

2. **Test each language**
   ```bash
   # Temporarily set language in localStorage
   localStorage.setItem('i18nextLng', 'es'); // Spanish
   localStorage.setItem('i18nextLng', 'ru'); // Russian
   localStorage.setItem('i18nextLng', 'zh'); // Chinese
   ```

3. **Check for issues**
   - [ ] All text translated (no English showing)
   - [ ] Text fits in UI elements
   - [ ] No layout breaks
   - [ ] Proper character encoding

### Automated Checks

**Check for missing keys**

```bash
# Compare locale files
diff <(jq -S 'keys' src/i18n/locales/en.json) \
     <(jq -S 'keys' src/i18n/locales/es.json)
```

**Validate JSON syntax**

```bash
# Check all locale files
for file in src/i18n/locales/*.json; do
  echo "Checking $file..."
  jq empty "$file" && echo "✓ Valid" || echo "✗ Invalid"
done
```

## Adding New Languages

### Step 1: Create Translation File

```bash
touch src/i18n/locales/fr.json  # French example
```

Copy structure from `en.json` and translate.

### Step 2: Update Configuration

```typescript
// src/i18n/config.ts
import en from './locales/en.json';
import es from './locales/es.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';
import fr from './locales/fr.json';  // Add new import

const resources = {
  en: { translation: en },
  es: { translation: es },
  ru: { translation: ru },
  zh: { translation: zh },
  fr: { translation: fr },  // Add to resources
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'ru', 'zh', 'fr'],  // Add to supported
    // ... rest of config
  });
```

### Step 3: Test New Language

1. Set browser language to new language
2. Or manually set: `localStorage.setItem('i18nextLng', 'fr')`
3. Refresh page
4. Verify all translations appear

## Common Issues

### Missing Translation Key

**Symptom**: Shows key instead of text (e.g., "app.title")

**Solution**: Add key to all locale files

```json
// Add to en.json, es.json, ru.json, zh.json
{
  "app": {
    "title": "..."
  }
}
```

### Text Overflow

**Symptom**: Text cuts off or breaks layout

**Solution**: 
- Use shorter translation
- Adjust CSS with Tailwind responsive classes
- Add `text-sm` or `truncate` classes

```tsx
<p className="text-sm md:text-base truncate">
  {t('longText')}
</p>
```

### Wrong Language Displayed

**Symptom**: Shows wrong language or always English

**Solution**:
1. Check browser language settings
2. Clear localStorage: `localStorage.removeItem('i18nextLng')`
3. Verify i18n configuration
4. Check console for errors

### Special Characters Broken

**Symptom**: Weird characters (�, Ã±, etc.)

**Solution**: Ensure UTF-8 encoding

```json
// Save files as UTF-8
// Most editors do this by default
```

## Translation Workflow

### For New Features

1. **Write English first**
   ```json
   // en.json
   {
     "newFeature": {
       "title": "New Feature",
       "description": "..."
     }
   }
   ```

2. **Use in development**
   ```tsx
   <h2>{t('newFeature.title')}</h2>
   ```

3. **Before merging, add translations**
   - Spanish
   - Russian
   - Chinese

4. **Test all languages**

### For Updates

1. **Identify changed keys**
2. **Update all locale files**
3. **Test affected components**

## Translation Tools

### Recommended Tools

- **Google Translate** - Quick initial translations
- **DeepL** - More accurate, better context
- **Native speakers** - Best for quality
- **i18n Ally (VS Code)** - Extension for managing translations

### VS Code Extension: i18n Ally

**Install**:
- Search "i18n Ally" in Extensions
- Install by Lokalise

**Features**:
- Inline translation display
- Missing key detection
- Translation extraction
- Multi-locale editing

## Best Practices

1. ✅ **Always translate to all languages**
2. ✅ **Keep translations in sync**
3. ✅ **Test with actual text, not placeholders**
4. ✅ **Consider text expansion (30-50% longer)**
5. ✅ **Use consistent terminology**
6. ✅ **Keep JSON files properly formatted**
7. ✅ **Add context comments for ambiguous terms**

---

For more about the overall architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).  
For feature details, see [FEATURES.md](./FEATURES.md).

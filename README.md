# Attention Training App

A web application for attention and mindfulness training through guided exercises. Built with React, TypeScript, and Tailwind CSS, featuring multi-language support and progress tracking.

## 🌟 Features

- **4 Guided Exercises**: Breathing (4-7-8), Visual Focus, Sound Meditation, and Mindful Observation
- **Multi-language Support**: Auto-detects and supports English, Spanish, Russian, and Chinese
- **Progress Tracking**: Tracks completed sessions and daily practice statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Wake Lock API**: Prevents screen from sleeping during exercises
- **Local Storage**: All progress saved locally in the browser

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📚 Documentation

For detailed documentation, see the [docs/](./docs) folder:

- [Getting Started](./docs/GETTING_STARTED.md) - Setup and first steps
- [Architecture](./docs/ARCHITECTURE.md) - Project structure and patterns
- [Features](./docs/FEATURES.md) - Detailed feature descriptions
- [Development Guide](./docs/DEVELOPMENT.md) - Development workflow
- [Localization](./docs/LOCALIZATION.md) - Working with translations

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **Internationalization**: i18next with auto-detection
- **State Management**: React Query for async state
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── exercises/      # Exercise-specific components
│   └── ui/             # shadcn/ui components
├── data/               # Static data (exercises)
├── hooks/              # Custom React hooks
├── i18n/               # Localization config and translations
├── lib/                # Utility functions
├── pages/              # Page components
└── types/              # TypeScript type definitions
```

## 🌐 Supported Languages

- 🇬🇧 English (default)
- 🇪🇸 Spanish
- 🇷🇺 Russian
- 🇨🇳 Chinese (Simplified)

Language is automatically detected based on browser settings.

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Lovable Project**: https://lovable.dev/projects/df4ca6c0-2424-4fde-aa23-4eeab0f467da
- **Documentation**: [docs/](./docs)
- **Issues**: Use GitHub Issues for bug reports and feature requests

## 💡 Tips

- Practice exercises daily for best results
- Start with shorter exercises (3 min) and gradually increase duration
- Use headphones for Sound Meditation exercise
- Enable notifications to track your practice streak

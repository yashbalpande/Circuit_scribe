# CircuitCode

An interactive learning platform for electronics and embedded systems education.

## Features

- **Circuit Simulator**: Interactive circuit simulation and design
- **Embedded Systems Challenges**: Hands-on programming challenges
- **Learning Modules**: Structured educational content
- **Progress Tracker**: Monitor your learning journey

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - Modern UI library
- **shadcn/ui** - Beautiful, accessible components
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Backend as a service

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd circuit-scribe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── CircuitSimulator.tsx
│   ├── EmbeddedSystemsChallenges.tsx
│   ├── LearningModules.tsx
│   └── ProgressTracker.tsx
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── integrations/       # External service integrations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
# Hyrox Simulator

A professional-grade web application that allows Hyrox athletes to train with the exact timing of world-class competitors. Built with Next.js, TypeScript, and modern web technologies.

## Features

- **Professional Athlete Times**: Train with real timing data from top Hyrox competitors
- **Interactive Timer**: Large, color-coded timer with audio alerts for event transitions
- **Mobile-First Design**: Responsive layout optimized for phone use during workouts
- **Dark/Light Mode**: Automatic theme switching with manual override
- **Progress Tracking**: Visual progress bar and event completion status
- **Audio Alerts**: Sound notifications when transitioning between events

## Design Decisions & Technologies

### Core Architecture
This application follows Robert C. Martin's Clean Code principles with a modular, component-based architecture. The codebase is organized into clear separation of concerns with custom hooks for business logic, reusable UI components, and type-safe data structures.

**Next.js 14** was chosen for its excellent performance, built-in optimization, and seamless deployment to Vercel. The app directory structure provides better organization and loading states, while TypeScript ensures type safety throughout the application.

**Tailwind CSS** provides utility-first styling with built-in dark mode support and responsive design. The modular CSS approach ensures consistent styling across components while maintaining excellent performance.

### New Package Integrations

**Framer Motion** (`framer-motion`) - Adds smooth, professional animations for component transitions, timer state changes, and micro-interactions. This enhances the user experience by providing visual feedback and creating a more engaging interface during workouts.

**use-sound** (`use-sound`) - Provides audio alert functionality for event transitions. This is crucial for Hyrox training as athletes need to know when to move between events without constantly watching the screen during intense workouts.

**Lucide React** (`lucide-react`) - Offers a comprehensive icon library with consistent styling that integrates perfectly with the modern design system. Icons are used throughout for controls, theme switching, and UI elements.

### Technical Implementation
The timer functionality uses a custom React hook (`useTimer`) that manages complex state including current event tracking, pause/resume functionality, and automatic progression through events. This separation of concerns keeps components clean and testable.

The theme system uses React Context and localStorage for persistence, automatically detecting system preferences while allowing manual override. CSS custom properties ensure consistent theming across all components.

Error boundaries and loading states follow Next.js best practices, providing graceful degradation and excellent user experience even on slower connections.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hyrox-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Add sound file:
Create a `public` folder and add a `beep.mp3` file for audio alerts.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

### Deployment

This application is optimized for deployment on Vercel:

```bash
npm install -g vercel
vercel
```

## Usage

1. Select a professional athlete from the dropdown menu
2. Click "Start" to begin the timer
3. Follow the event progression with visual and audio cues
4. Use pause/resume/stop controls as needed during your workout
5. Track your progress with the visual progress bar
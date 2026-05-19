# 🎯 Quiz App

### A production-grade, web-based quiz application built with Next.js, Tailwind CSS, and MongoDB.

[![CodeFactor](https://www.codefactor.io/repository/github/prshntshinde/quiz-app/badge/main)](https://www.codefactor.io/repository/github/prshntshinde/quiz-app/overview/main) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=prshntshinde_quiz-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=prshntshinde_quiz-app) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- **Modern UI/UX**: A beautiful, minimal interface featuring glassmorphism effects, vibrant gradients, and smooth animations.
- **Responsive Design**: Seamlessly adapts to mobile, tablet, and desktop devices.
- **Dynamic Quiz Listing**: Beautifully rendered quiz cards with clear calls to action.
- **Rules System**: Integrated rules modal for each quiz with structured information.
- **Real-time Feedback**: Interactive quiz taking experience with instant feedback.
- **Accessibility**: Built with accessibility in mind, including keyboard navigation and ARIA support.
- **Dark Mode Support**: Optimized for both light and dark viewing experiences.
- **Performance**: Optimized data fetching with Mongoose `.lean()` and Server Components.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://react.dev/) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Utilities**: [class-variance-authority](https://cva.style/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/t3-oss/create-tailwind-merger), [prop-types](https://www.npmjs.com/package/prop-types), [react-countdown-circle-timer](https://www.npmjs.com/package/react-countdown-circle-timer)

---

## 🧪 Testing

Tests are powered by [Vitest](https://vitest.dev/) with jsdom environment and [Testing Library](https://testing-library.com/).

### Commands

```bash
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm test -- --coverage  # Run with coverage report
```

### Features

- **In-memory MongoDB**: Tests auto-start a MongoDB Memory Server (180s timeout).
- **Path Aliases**: `@/` → project root, `@/lib/` → `lib/`, `@/libs/` → `libs/`
- **Pattern**: Test files live alongside source: `*.test.ts` and `*.test.tsx`
- **Mocking**: Use `vi.mock()` for modules; `vi.hoisted()` for shared mock objects.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ (LTS recommended)
- MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prshntshinde/quiz-app.git
   cd quiz-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the app:**
   ```bash
   npm run dev       # Start development server
   npm run build     # Production build
   npm run lint      # Lint code
   npm run typecheck # TypeScript check
   npm test          # Run tests
   ```

5. **Visit the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

- `/app` — Next.js App Router (pages, layouts, route groups)
- `/app/components/` — Shared UI components (QuizCard, Modal, RulesModal, etc.)
- `/app/admin/`, `/app/quiz/` — Route pages
- `/lib/actions/` — Server Actions (quiz.ts, etc.)
- `/lib/` — Utility libraries and helpers
- `/libs/` — Additional libraries
- `/models/` — Mongoose database schemas
- `/public/` — Static assets
- `/vitest.config.ts` — Vitest test configuration
- `/vitest.setup.ts` — Test setup (MongoDB, global mocks)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/f90c8defedf41c9e4e17a3cd64cb8410c3a75d2e.svg "Repobeats analytics image")

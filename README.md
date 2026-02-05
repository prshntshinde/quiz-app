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

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Animations**: [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Backend**: Next.js Server Actions & API Routes

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18.18.2 or higher
- MongoDB instance (Local or Cloud)

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

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Visit the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

- `/app`: Next.js App Router (Pages and Layouts)
- `/app/components`: Reusable UI components (QuizCard, Modal, RulesModal, etc.)
- `/libs`: Utility libraries and database connection logic
- `/models`: Mongoose database schemas
- `/public`: Static assets

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/f90c8defedf41c9e4e17a3cd64cb8410c3a75d2e.svg "Repobeats analytics image")

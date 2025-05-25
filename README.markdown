# Brain Quest

![Brain Quest Banner](https://via.placeholder.com/1200x300.png?text=Brain+Quest) <!-- Replace with actual banner image if available -->

**Brain Quest** is an interactive quiz application built with React and TypeScript, designed to test your knowledge across various categories and difficulty levels. Powered by the Open Trivia Database API, it offers a dynamic and engaging experience with features like real-time scoring, a countdown timer, and quiz history tracking.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Multiple Categories**: Choose from categories like General Knowledge, History, and Film.
- **Difficulty Levels**: Select from Easy, Medium, or Hard to match your skill level.
- **Timed Quizzes**: Answer questions within a 15-second time limit for added challenge.
- **Score Tracking**: Track your current score, best score, and total score.
- **Quiz History**: View past quiz results with details on category, difficulty, score, and success rate.
- **Theme Switching**: Toggle between light and dark themes for a personalized experience.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Data Caching**: Stores fetched quiz data to reduce API calls and improve performance.

## Demo

Try the live demo [here](#). <!-- Replace with actual deployment link if available -->

## Installation

To run **Brain Quest** locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/brain-quest.git
   cd brain-quest
   ```

2. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## Usage

1. **Select a Category and Difficulty**:

   - On the homepage, choose a category (e.g., General Knowledge, History, Film) and a difficulty level (Easy, Medium, Hard).
   - Click **Start Quiz** to begin.

2. **Answer Questions**:

   - Answer each question within 15 seconds.
   - Earn points based on difficulty (1 for Easy, 2 for Medium, 3 for Hard).

3. **View Results**:

   - After completing 10 questions, view your score, correct answers, and success rate.
   - Save your best score or try another quiz.

4. **Check Statistics**:

   - Navigate to the Statistics page to see your best score, total score, and quiz history.

5. **Toggle Theme**:
   - Click the sun icon to switch between light and dark themes.

## Technologies

- **React**: Frontend library for building the user interface.
- **TypeScript**: Adds static typing for improved code reliability.
- **Redux**: State management for quiz settings and history.
- **Axios**: For fetching quiz data from the Open Trivia Database API.
- **Ant Design**: For UI components like tooltips and collapsible history.
- **React Icons**: For category-specific icons.
- **SCSS Modules**: For modular and maintainable styling.
- **React Router**: For navigation between pages.
- **he**: For decoding HTML entities in quiz data.

## Project Structure

```plaintext
brain-quest/
├── src/
│   ├── components/
│   │   ├── questionCard/
│   │   │   └── QuestionCard.tsx      # Displays individual quiz questions
│   │   ├── selectors/
│   │   │   ├── CategorySelector.tsx  # Category selection component
│   │   │   └── DifficultySelector.tsx# Difficulty selection component
│   │   └── Statistics.tsx            # Displays quiz statistics
│   ├── hooks/
│   │   ├── useFetch.ts              # Custom hook for fetching quiz data
│   │   ├── useTimer.ts              # Custom hook for countdown timer
│   │   └── useTypedSelector.ts       # Typed Redux selector hook
│   ├── pages/
│   │   ├── HomePage.tsx             # Homepage with category/difficulty selection
│   │   ├── QuizPage.tsx             # Quiz gameplay page
│   │   ├── ResultPage.tsx           # Displays quiz results
│   │   └── StatsPage.tsx            # Displays quiz history and stats
│   ├── store/
│   │   ├── features/
│   │   │   ├── quiz.slice.ts        # Redux slice for quiz state
│   │   │   └── theme.slice.ts       # Redux slice for theme state
│   │   └── store.ts                 # Redux store configuration
│   └── styles/
│       ├── *.module.scss            # SCSS modules for component-specific styling
├── public/
│   └── index.html                   # Entry point for the React app
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Your Name](https://github.com/your-username). <!-- Replace with your GitHub username -->

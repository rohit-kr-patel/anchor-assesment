# Frontend README

## Project Overview

This project is the frontend part of a YouTube Comment Analyzer application. It allows users to input a YouTube video URL and analyze the comments for sentiment analysis. The frontend is built using React and Vite, with Tailwind CSS for styling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Folder Structure](#folder-structure)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Enter a YouTube video URL to analyze its comments.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run preview`: Previews the production build.

## Dependencies

- `@shadcn/ui`: ^0.0.4
- `@tailwindcss/vite`: ^4.0.0
- `autoprefixer`: ^10.4.20
- `axios`: ^1.7.9
- `chart.js`: ^4.4.7
- `postcss`: ^8.5.1
- `react`: ^18.3.1
- `react-chartjs-2`: ^5.3.0
- `react-dom`: ^18.3.1
- `react-router-dom`: ^7.1.3
- `shadcn-ui`: ^0.9.4
- `tailwindcss`: ^4.0.0

## Dev Dependencies

- `@eslint/js`: ^9.17.0
- `@types/react`: ^18.3.18
- `@types/react-dom`: ^18.3.5
- `@vitejs/plugin-react`: ^4.3.4
- `eslint`: ^9.17.0
- `eslint-plugin-react`: ^7.37.2
- `eslint-plugin-react-hooks`: ^5.0.0
- `eslint-plugin-react-refresh`: ^0.4.16
- `globals`: ^15.14.0
- `vite`: ^6.0.11

## Folder Structure

```
frontend/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Home.jsx
│   │   └── Results.jsx
│   ├── index.css
│   └── main.jsx
├── vite.config.js
└── README.md
```

- `src/`: Contains the source code for the frontend application.
- `src/components/`: Contains the React components used in the application.
- `src/index.css`: Contains the global CSS styles.
- `src/main.jsx`: Entry point for the React application.
- `eslint.config.js`: ESLint configuration file.
- `vite.config.js`: Vite configuration file.

## License

This project is licensed under the MIT License.
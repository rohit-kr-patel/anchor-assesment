# YouTube Comment Analyzer

## Project Overview

This project is a YouTube Comment Analyzer application. It consists of a backend and a frontend. The backend is built using Node.js, Express, and MongoDB, while the frontend is built using React and Vite, with Tailwind CSS for styling. The application allows users to input a YouTube video URL and analyze the comments for sentiment analysis.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Folder Structure](#folder-structure)
- [License](#license)

## Installation

### Backend

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the environment variables:
    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    MONGODB_URI=<your-mongodb-uri>
    YOUTUBE_API_KEY=<your-youtube-api-key>
    GEMINI_API_KEY=<your-gemini-api-key>
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Enter a YouTube video URL in the input field on the frontend.
2. Click the "Analyze Comments" button.
3. View the analysis results, including sentiment statistics and comment distribution.

## Environment Variables

- `MONGODB_URI`: The URI for connecting to MongoDB.
- `YOUTUBE_API_KEY`: The API key for accessing YouTube Data API.
- `GEMINI_API_KEY`: The API key for accessing Google Generative AI.

## API Endpoints

### POST `/api/analyze`

Analyzes the comments of a YouTube video.

- **Request Body**:
    ```json
    {
      "videoUrl": "https://www.youtube.com/watch?v=..."
    }
    ```

- **Response**:
    ```json
    {
      "id": "<analysis-id>"
    }
    ```

### GET `/api/analysis/:id`

Fetches the analysis results for a given analysis ID.

- **Response**:
    ```json
    {
      "videoUrl": "https://www.youtube.com/watch?v=...",
      "totalComments": 100,
      "sentimentStats": {
        "agree": 50,
        "disagree": 30,
        "neutral": 20
      },
      "monthlyDistribution": [
        {
          "month": "Jan",
          "count": 10
        },
        ...
      ],
      "comments": [
        {
          "maskedUsername": "J***e",
          "originalComment": "Great video!",
          "sentiment": "agree",
          "timestamp": "2023-01-01T00:00:00.000Z"
        },
        ...
      ],
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
    ```

## Dependencies

### Backend

- `@google/generative-ai`: ^0.21.0
- `axios`: ^1.7.9
- `cors`: ^2.8.5
- `dotenv`: ^16.4.7
- `express`: ^4.21.2
- `mongoose`: ^8.9.5

### Frontend

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

## Folder Structure

```
root/
├── backend/
│   ├── .env
│   ├── analyzeComments.js
│   ├── models/
│   │   └── analysis.js
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   └── Results.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## License

This project is licensed under the MIT License.
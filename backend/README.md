# Backend README

## Project Overview

This project is the backend part of a YouTube Comment Analyzer application. It provides APIs to analyze YouTube video comments for sentiment analysis. The backend is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Folder Structure](#folder-structure)
- [License](#license)

## Installation

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

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will run on `http://localhost:5000`.

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

- `@google/generative-ai`: ^0.21.0
- `axios`: ^1.7.9
- `cors`: ^2.8.5
- `dotenv`: ^16.4.7
- `express`: ^4.21.2
- `mongoose`: ^8.9.5

## Folder Structure

```
backend/
├── .env
├── analyzeComments.js
├── models/
│   └── analysis.js
├── package.json
├── server.js
└── README.md
```

- `.env`: Environment variables file.
- `analyzeComments.js`: Contains the logic for fetching and analyzing YouTube comments.
- `models/`: Contains the Mongoose models.
- `server.js`: Entry point for the Express server.

## License

This project is licensed under the MIT License.
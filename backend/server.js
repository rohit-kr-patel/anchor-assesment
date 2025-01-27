const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { analyzeComments } = require("./analyzeComments");
const Analysis = require("./models/analysis");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

app.use(cors({
  origin:  "http://localhost:5173/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// Configure CORS with proper origin


// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in environment variables.");
  process.exit(1); // Exit the process
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Endpoint to analyze comments from a YouTube video URL
app.post("/api/analyze", async (req, res) => {
  try {
    const { videoUrl } = req.body;

    // Validate input
    if (!videoUrl) {
      return res.status(400).json({ error: "Video URL is required" });
    }

    // Perform analysis
    const analysis = await analyzeComments(videoUrl);

    // Save analysis to the database
    const savedAnalysis = new Analysis(analysis);
    await savedAnalysis.save();

    res.status(201).json({ id: savedAnalysis._id });
  } catch (error) {
    console.error("Analysis error:", error);

    if (error.message.includes("Invalid YouTube URL")) {
      res.status(400).json({ error: error.message });
    } else if (error.message.includes("No comments found")) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes("Invalid Gemini API key")) {
      res.status(500).json({
        error:
          "There's an issue with our sentiment analysis service. Please try again later or contact support.",
      });
    } else {
      res.status(500).json({
        error: "An unexpected error occurred during analysis. Please try again.",
      });
    }
  }
});

// Endpoint to fetch analysis results by ID
app.get("/api/analysis/:id", async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }

    res.json(analysis);
  } catch (error) {
    console.error("Error fetching analysis:", error);

    res
      .status(500)
      .json({ error: "An error occurred while fetching the analysis" });
  }
});


// Default endpoint
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

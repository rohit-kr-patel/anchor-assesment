const axios = require("axios")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const Analysis = require("./models/analysis")
require("dotenv").config()

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Function to fetch comments from a YouTube video
async function fetchYouTubeComments(videoId) {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100&key=${process.env.YOUTUBE_API_KEY}`,
  )
  return response.data.items || []
}

// Function to extract the video ID from a YouTube URL
function extractVideoId(url) {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

// Function to analyze the sentiment of a comment
async function analyzeSentiment(comment) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = `Analyze if this YouTube comment agrees, disagrees, or is neutral about the video content. Only respond with one word: AGREE, DISAGREE, or NEUTRAL.
    Comment: "${comment}"`

    const result = await model.generateContent(prompt)
    const text = result.response.text().trim().toUpperCase()

    if (text.includes("AGREE")) return "agree"
    if (text.includes("DISAGREE")) return "disagree"
    return "neutral"
  } catch (error) {
    if (error.message.includes("API key not valid")) {
      throw new Error("Invalid Gemini API key. Please check your environment variables.")
    }
    throw error
  }
}

// Function to mask the username for privacy
function maskUsername(username) {
  return username.charAt(0) + "*".repeat(username.length - 2) + username.charAt(username.length - 1)
}

// Function to get the month key from a date
function getMonthKey(date) {
  return date.toLocaleString("default", { month: "short" })
}

// Main function to analyze comments from a YouTube video URL
async function analyzeComments(videoUrl) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error("Invalid YouTube URL. Please provide a valid YouTube video URL.");
  }

  try {
    const comments = await fetchYouTubeComments(videoId);

    if (!comments || comments.length === 0) {
      throw new Error("No comments found for this video. It may be private or have comments disabled.");
    }

    const monthlyDistribution = {};
    const sentiments = { agree: 0, disagree: 0, neutral: 0 };
    const analyzedComments = [];

    for (const comment of comments) {
      const text = comment.snippet.topLevelComment.snippet.textDisplay;
      const timestamp = new Date(comment.snippet.topLevelComment.snippet.publishedAt);
      const monthKey = getMonthKey(timestamp);

      monthlyDistribution[monthKey] = (monthlyDistribution[monthKey] || 0) + 1;

      try {
        const sentiment = await analyzeSentiment(text);
        sentiments[sentiment]++;

        analyzedComments.push({
          maskedUsername: maskUsername(comment.snippet.topLevelComment.snippet.authorDisplayName),
          originalComment: text,
          sentiment,
          timestamp,
        });
      } catch (error) {
        if (error.message.includes("Invalid Gemini API key")) {
          throw error; // Rethrow this specific error to be handled in server.js
        }
        console.error("Error analyzing sentiment:", error);
        // Continue with the next comment if there's an error with one
      }
    }

    const total = Object.values(sentiments).reduce((a, b) => a + b, 0);
    const sentimentStats = {
      agree: Math.round((sentiments.agree / total) * 100),
      disagree: Math.round((sentiments.disagree / total) * 100),
      neutral: Math.round((sentiments.neutral / total) * 100),
    };

    // Save the analysis in MongoDB
    const analysis = await Analysis.create({
      videoUrl,
      totalComments: total,
      sentimentStats,
      monthlyDistribution: Object.entries(monthlyDistribution).map(([month, count]) => ({
        month,
        count,
      })),
      comments: analyzedComments,
    });

    return analysis;
  } catch (error) {
    console.error("Error in analyzeComments:", error.message);
    throw error;
  }
}

module.exports = { analyzeComments }


const mongoose = require("mongoose")

const AnalysisSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  totalComments: Number,
  sentimentStats: {
    agree: Number,
    disagree: Number,
    neutral: Number,
  },
  monthlyDistribution: [
    {
      month: String,
      count: Number,
    },
  ],
  comments: [
    {
      maskedUsername: String,
      originalComment: String,
      sentiment: String,
      timestamp: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Analysis", AnalysisSchema)


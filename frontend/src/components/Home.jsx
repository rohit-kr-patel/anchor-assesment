import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Home() {
  // State to store the video URL input by the user
  const [videoUrl, setVideoUrl] = useState("")
  // State to manage the loading state of the form submission
  const [isLoading, setIsLoading] = useState(false)
  // Hook to navigate to different routes programmatically
  const navigate = useNavigate()

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Send a POST request to the backend API with the video URL
      const response = await axios.post("http://localhost:5000/api/analyze", { videoUrl })
      // Navigate to the results page with the response data ID
      navigate(`/results/${response.data.id}`)
    } catch (error) {
      console.error("Analysis error:", error)
      if (error.response) {
        // Handle specific error messages from the backend
        if (error.response.data.error.includes("sentiment analysis service")) {
          alert(
            "We're experiencing issues with our sentiment analysis service. Please try again later or contact support.",
          )
        } else {
          alert(error.response.data.error || "An error occurred during analysis. Please try again.")
        }
      } else {
        // Handle network or other errors
        alert("An error occurred. Please check your internet connection and try again.")
      }
    } finally {
      // Reset the loading state
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">YouTube Comment Analyzer</h1>
          <p className="text-gray-400">Enter a YouTube video URL to analyze its comments</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze Comments"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Home


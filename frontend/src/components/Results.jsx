import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Chart configuration options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "#fff",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "#fff",
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#fff",
      },
    },
  },
}

function Results() {
  // State to store the analysis data
  const [analysis, setAnalysis] = useState(null)
  // State to manage the loading state of the data fetching
  const [isLoading, setIsLoading] = useState(true)
  // Get the analysis ID from the URL parameters
  const { id } = useParams()

  useEffect(() => {
    // Function to fetch the analysis data from the backend API
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/analysis/${id}`)
        setAnalysis(response.data)
      } catch (error) {
        console.error("Error fetching analysis:", error)
        alert("Failed to fetch analysis results. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysis()
  }, [id])

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (!analysis) {
    return <div className="text-center mt-8">Analysis not found</div>
  }

  // Prepare the data for the chart
  const chartData = {
    labels: analysis.monthlyDistribution.map((item) => item.month),
    datasets: [
      {
        label: "Comments",
        data: analysis.monthlyDistribution.map((item) => item.count),
        backgroundColor: "rgba(147, 112, 219, 0.5)",
        borderColor: "rgb(147, 112, 219)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Results</span>
        </nav>

        <h1 className="text-2xl font-bold">Analysis Results</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Sentiment Analysis</h2>
            <div className="space-y-4">
              {["agree", "disagree", "neutral"].map((sentiment) => (
                <div key={sentiment}>
                  <div className="flex justify-between mb-1">
                    <span>{sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</span>
                    <span>{analysis.sentimentStats[sentiment]}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        sentiment === "agree" ? "bg-green-500" : sentiment === "disagree" ? "bg-red-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${analysis.sentimentStats[sentiment]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Total Comments {analysis.totalComments} </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              {["agree", "disagree", "neutral"].map((sentiment) => (
                <div key={sentiment}>
                  <div
                    className={`text-4xl font-bold ${
                      sentiment === "agree"
                        ? "text-green-500"
                        : sentiment === "disagree"
                          ? "text-red-500"
                          : "text-blue-500"
                    }`}
                  >
                    {Math.round((analysis.sentimentStats[sentiment] * analysis.totalComments) / 100)}
                  </div>
                  <div className="text-sm text-gray-400">{sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Comment Distribution</h2>
          <div className="h-[300px]">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>

        <div className="flex justify-center">
          <Link to="/">
            <button className="bg-white text-black hover:bg-gray-200 py-2 px-4 rounded">Back to Input</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Results


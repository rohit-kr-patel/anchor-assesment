import { useState } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from "./components/Home"
import Results from "./components/Results"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results/:id" element={<Results />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


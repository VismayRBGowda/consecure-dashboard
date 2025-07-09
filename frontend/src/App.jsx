import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from "react-router-dom";
import './App.css'
import ThreatTable from "./components/ThreatTable";
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import ThreatDetails from './components/ThreatDetails';
import Dashboard from './components/Dashboard';
import Analyze from "./components/Analyze";

// const Home = () => 
// const Dashboard = () => <div className="text-center mt-20 text-2xl">Dashboard View (Coming Soon)</div>;
// const Analyze = () => <div className="text-center mt-20 text-2xl">Analysis Tool (Coming Soon)</div>;


function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white px-4">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex justify-center items-center gap-3 text-lime-400 text-6xl font-bold">
          Threat Intelligence Dashboard
        </div>

        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Stay informed and ahead of cyber threats with real-time insights, analytics, and visualizations tailored to your organization's security.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-lime-600 hover:bg-lime-500 cursor-pointer text-white px-6 py-3 rounded-full font-semibold shadow-md transition duration-300"
        >
          Explore Dashboard
        </button>
      </div>
    </div>
  );
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/threats/:id" element={<ThreatDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/threats" element={<ThreatTable />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

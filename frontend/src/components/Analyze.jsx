import { useState } from "react";
import axios from "axios";

function Analyze() {
  const [description, setDescription] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeThreat = async () => {
    if (!description) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/analyze", {
        description,
      });
      setPrediction(res.data.predicted_category);
    } catch (err) {
      console.error("Error analyzing threat:", err);
      setPrediction("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-neutral-900 text-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-amber-500">Threat Description Analyzer</h1>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Paste a suspicious threat description..."
        rows={6}
        className="w-full p-4 rounded bg-neutral-800 text-white outline-none"
      ></textarea>
      <button
        onClick={analyzeThreat}
        className="mt-4 px-6 py-2 bg-lime-600 hover:bg-lime-500 rounded font-semibold"
      >
        Analyze
      </button>

      {loading && <p className="mt-4 text-yellow-400">Analyzing...</p>}
      {prediction && !loading && (
        <p className="mt-4 text-xl font-bold text-amber-400">
          Predicted Category: <span className="text-white">{prediction}</span>
        </p>
      )}
    </div>
  );
}

export default Analyze;

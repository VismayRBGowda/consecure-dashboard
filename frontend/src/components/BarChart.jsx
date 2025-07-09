// components/BarChart.js
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ title, data }) {
  const labels = data.map(item => item._id || "Unknown");
  const values = data.map(item => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: "#60a5fa",
        // borderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-neutral-800 p-4 rounded shadow-md w-[800px] group hover:shadow-lg transition-shadow duration-500">
      <h2 className="text-center text-white font-semibold mb-2">{title}</h2>
      <div className="w-[90%] h-[1px] my-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-r from-transparent via-zinc-600 to-transparent rounded-full"></div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart;

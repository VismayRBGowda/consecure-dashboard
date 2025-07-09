import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({title, data}){
    const labels = data.map(item => String(item._id ?? "Unknown"));
    const values = data.map(item => item.count);
    const total = values.reduce((acc, val) => acc + val, 0);
    const backgroundColors = [
        "#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa", "#34d399", "#f472b6"
    ];

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: backgroundColors,
                borderWidth: 1,
            },
        ],
    };

   const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const total = data.reduce((sum, item) => sum + item.count, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            const label = chartData.labels[tooltipItem.dataIndex];
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: 'right', // 🟢 Moves the legend to the right
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
    },
    maintainAspectRatio: false,
  };


    if (!Array.isArray(data) || data.length === 0) return null;


    return (
        <div className="bg-neutral-800 p-2 rounded shadow-md h-[300px] flex flex-col justify-center items-center max-w-[28vw] group hover:shadow-lg transition-shadow duration-500">
          <h2 className="text-center text-white mt-2 font-bold">{title}</h2>
          <div className="w-[90%] h-[1px] my-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-r from-transparent via-zinc-600 to-transparent rounded-full"></div>          
          <div className="w-[220px] h-[300px]"> {/* Shrink chart size */}
            <Doughnut key={title} data={chartData} options={options} />
          </div>
        </div>
    );
}

export default DoughnutChart;
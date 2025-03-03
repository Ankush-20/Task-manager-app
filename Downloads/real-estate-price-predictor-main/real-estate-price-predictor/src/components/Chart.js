// import { useEffect, useRef } from "react";
// import { Chart } from "chart.js/auto";

// const ChartComponent = ({ actualPrices = [], predictedPrices = [] }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = document.getElementById("chartCanvas");

//     // ✅ Destroy previous chart instance before creating a new one
//     if (chartRef.current !== null) {
//       chartRef.current.destroy();
//     }

//     chartRef.current = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: actualPrices.map((_, index) => `House ${index + 1}`),
//         datasets: [
//           { label: "Actual Price ($1000)", data: actualPrices, backgroundColor: "blue" },
//           { label: "Predicted Price ($1000)", data: predictedPrices, backgroundColor: "red" }
//         ]
//       },
//       options: {
//         responsive: true,
//         plugins: { legend: { display: true } }
//       }
//     });

//     return () => {
//       if (chartRef.current !== null) {
//         chartRef.current.destroy();
//       }
//     };
//   }, [actualPrices, predictedPrices]);

//   return <canvas id="chartCanvas"></canvas>;
// };

// export default ChartComponent;


import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Fix: Register necessary components to prevent "category" error
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ actualPrices = [], predictedPrices = [] }) => {
  // ✅ Fix: Prevent rendering if no data is available
  if (actualPrices.length === 0 || predictedPrices.length === 0) {
    return <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>📊 Waiting for Predictions...</p>;
  }

  const data = {
    labels: actualPrices.map((_, index) => `House ${index + 1}`),
    datasets: [
      {
        label: "Actual Prices ($1000)",
        data: actualPrices,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Predicted Prices ($1000)",
        data: predictedPrices,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { type: "category" }, // ✅ Fix: Explicitly register "category" scale
      y: { beginAtZero: false },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "900px", height: "400px", margin: "30px auto", padding: "10px" }}>
      <h3 style={{ textAlign: "center" }}>📊 Price Comparison Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;


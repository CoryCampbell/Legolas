import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { StocksData } from "../../fake-data/data";

// ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const LineChart = () => {
  const [stockData, setStockData] = useState({
    labels: StocksData.map((data) => data.year),
    datasets: [
      {
        label: "Stock Price",
        data: StocksData.map((data) => data.highestPrice),
        backgroundColor: ["#91d142"],
      },
    ],
  });

  return (
    <div style={{ width: 700 }}>
      <Line data={stockData} />
    </div>
  );
};

export default LineChart;

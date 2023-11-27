import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { StocksData } from "../../fake-data/data";
import "./chart.css";

// ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const MiniChart = () => {
  const [showRandomChart, setShowRandomChart] = useState(
    Math.ceil(Math.random() * 3)
  );
  const [stockData, setStockData] = useState({
    labels: StocksData.map((data) => data.year),
    datasets: [
      {
        label: null,
        data: StocksData.map((data) => data.highestPrice),
        backgroundColor: ["#91d142"],
      },
    ],
  });

  // useEffect(() => {
  //   const n = Math.floor(Math.random(3)) + 1;
  //   setShowRandomChart(n.toString());
  //   console.log("============>", n);
  // }, []);

  return (
    <div className="mini-graph-container">
      {/* <Line data={stockData} /> */}
      <div className={`parent${showRandomChart}`}>
        <div className={`magicpattern${showRandomChart}`} />
      </div>
      {/* <div className={`parent${showRandomChart}`}>
        <div className="magicpattern2" />
      </div>
      <div className={`parent${showRandomChart}`}>
        <div className="magicpattern3" />
      </div> */}
    </div>
  );
};

export default MiniChart;

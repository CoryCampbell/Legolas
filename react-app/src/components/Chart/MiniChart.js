import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { StocksData } from "../../fake-data/data";
import "./chart.css";

// ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);



const MiniChart = () => {
	const [stockData, setStockData] = useState({
		labels: StocksData.map((data) => data.year),
		datasets: [
			{
				label: null,
				data: StocksData.map((data) => data.highestPrice),
				backgroundColor: ["#91d142"]
			}
		]
	});

	return (
		<div className="mini-graph-container">
			<Line data={stockData} />
		</div>
	);
};

export default MiniChart;
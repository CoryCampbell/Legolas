import { useSelector } from "react-redux";
import Landing from "./Landing";
import "./Portfolio.css";
import LineChart from "../Chart/LineChart";

const Portfolio = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
		<div className="portfolio">
			{sessionUser ? (
				<div>
					<div className="user-info">
						<h3 className="portfolio-value">${sessionUser.balance}</h3>
					</div>
					<LineChart />
				</div>
			) : (
				<Landing />
			)}
		</div>
	);
};

export default Portfolio;

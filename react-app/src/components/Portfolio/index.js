import { useSelector } from "react-redux";
import Landing from "./Landing";
import "./Portfolio.css";
import LineChart from "../Chart/LineChart";

const Portfolio = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
		<div className="main-portfolio-container">
			{sessionUser ? (
				<>
					<div className="main-left-container">
						<div className="user-info">
							<h1 className="portfolio-value">${sessionUser.balance}</h1>
						</div>
						<LineChart />
						<div className="mod about-mod">ABOUT</div>
						<div className="mod discover-mod">DISCOVER</div>
						<div className="mod trending-mod">TRENDING</div>
						<div className="mod learning-mod">LEARNING</div>
						<div className="mod news-mod">NEWS</div>
					</div>
					<div className="main-list-container">
						Lists
						<div className="watchlist">Watchlist 1</div>
						<div className="watchlist">Watchlist 2</div>
						<div className="watchlist">Watchlist 3</div>
					</div>
				</>
			) : (
				<Landing />
			)}
		</div>
	);
};

export default Portfolio;

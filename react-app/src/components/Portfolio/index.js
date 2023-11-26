import { useSelector, useDispatch } from "react-redux";
import Landing from "./Landing";
import "./Portfolio.css";
import LineChart from "../Chart/LineChart";
import { useEffect } from "react";
import { fetchUserPortfolio } from "../../store/portfolio";
import { fetchAllCompanies, fetchCompany } from "../../store/companies";
import Watchlist from "../Watchlists";
import { fetchAllWatchlists } from "../../store/watchlists";

const Portfolio = () => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	console.log("sessionUser", sessionUser);

	useEffect(() => {
		dispatch(fetchUserPortfolio(sessionUser?.id));
		dispatch(fetchAllWatchlists(sessionUser?.id));
	}, [dispatch, sessionUser?.id]);

	return (
		<div className="main-portfolio-container">
			{sessionUser ? (
				<>
					<div className="main-left-container">
						<div className="user-info">
							<h2 className="portfolio-value">${sessionUser.balance}</h2>
						</div>
						<LineChart />

						<div>Buying Power: ${sessionUser.balance}</div>

						<div className="mod discover-mod">DISCOVER</div>
						<div className="mod trending-mod">TRENDING</div>
						<div className="mod learning-mod">LEARNING</div>
						<div className="mod news-mod">NEWS</div>
					</div>
					<Watchlist />
				</>
			) : (
				<Landing />
			)}
		</div>
	);
};

export default Portfolio;

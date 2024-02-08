import { useSelector, useDispatch } from "react-redux";
import Landing from "./Landing";
import "./Portfolio.css";
import LineChart from "../Chart/LineChart";
import { useEffect, useState } from "react";
import { fetchUserPortfolio } from "../../store/portfolio";
import { fetchAllCompanies } from "../../store/companies";
import Watchlist from "../Watchlists";
import { getUserTransactionsThunk } from "../../store/transactions";
import { getUserThunk } from "../../store/session";

const Portfolio = () => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session?.user);

	const [currentBalance, setCurrentBalance] = useState(sessionUser?.balance);

	const userPortfolio = useSelector((state) => Object.values(state.portfolio?.currentUserPortfolio));

	console.log(sessionUser?.balance, 'session user balance')
	let totalPortfolioValue = 0;

	userPortfolio?.map((stock) => {
		totalPortfolioValue += stock.price;
	});

	useEffect(() => {
		if (sessionUser) {
			dispatch(fetchUserPortfolio(sessionUser?.id));
			dispatch(fetchAllCompanies());
			dispatch(getUserTransactionsThunk(sessionUser?.id))
			getUserThunk(sessionUser?.id)
			setCurrentBalance(sessionUser?.balance)
		}
	}, [dispatch, sessionUser, totalPortfolioValue, sessionUser?.balance]);

	return (
		<div className="main-portfolio-container">
			{sessionUser && userPortfolio ? (
				<>
					<div className="main-left-container">
						<div className="user-info">
							<h2 className="portfolio-value">${sessionUser?.balance.toFixed(2)}</h2>
						</div>
						<LineChart />

						<div className="portfolio-buying-power-container">
							<p>Buying Power</p>
							<div>${sessionUser.balance.toFixed(2)}</div>
						</div>

						<div className="mod discover-mod">
							DISCOVER
							<div>
								Explore a world of investment opportunities in our Discover section. Uncover potential stocks, gain
								insights into market trends, and stay informed about the latest financial news. Whether you're a
								seasoned investor or just starting, our curated selection of stocks and comprehensive market analyses
								empower you to make informed decisions. Dive into a wealth of information, discover hidden gems, and
								take control of your financial journey with our intuitive tools and expert recommendations.
							</div>
						</div>
						<div className="mod trending-mod">
							TRENDING
							<div>
								Keep your finger on the pulse of the market with our Trending section. Stay ahead of the curve as you
								explore the stocks and investment trends that are capturing the attention of traders and investors
								alike. Discover the hottest opportunities, track emerging market movements, and leverage real-time data
								to make timely decisions. Our Trending section is your gateway to the dynamic world of finance, helping
								you identify and capitalize on the latest trends shaping the investment landscape. Whether you're
								seeking short-term gains or long-term investments, this curated space is designed to guide you through
								the ever-changing currents of the financial market.
							</div>
						</div>
						<div className="mod learning-mod">
							LEARNING
							<div>
								Empower yourself with knowledge through our Learning section. Unlock a wealth of educational resources
								designed to enhance your understanding of financial markets and investment strategies. Dive into
								interactive courses, insightful articles, and engaging tutorials curated to cater to all levels of
								expertise. Whether you're a novice looking to grasp the basics or a seasoned investor seeking advanced
								insights, our Learning section provides a comprehensive platform for continuous growth. Equip yourself
								with the tools to navigate the complexities of finance, make informed decisions, and embark on a journey
								towards financial literacy and success.
							</div>
						</div>
						<div className="mod news-mod">
							NEWS
							<div>
								Stay informed and up-to-date with our News section. Explore the latest developments in the financial
								world, from market trends and economic indicators to company announcements and global events. Our
								curated news feed delivers real-time updates, insightful analyses, and breaking stories that impact the
								stock market. Whether you're a day trader, long-term investor, or simply curious about the financial
								landscape, our News section is your go-to source for relevant, reliable, and timely information. Stay
								ahead of the curve and make well-informed decisions as you navigate the dynamic world of finance.
							</div>
						</div>
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

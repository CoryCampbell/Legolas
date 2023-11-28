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

	const sessionUser = useSelector((state) => state.session?.user);
	// console.log("sessionUser", sessionUser);

	const userPortfolio = useSelector((state) => Object.values(state.portfolio?.currentUserPortfolio));
	//   console.log("userPortfolio", userPortfolio);

	let totalPortfolioValue = 0;

	userPortfolio?.map((stock) => {
		console.log("stockkkkkkkk", stock);
		totalPortfolioValue += stock.price;
		// console.log("totalPortfolioValue", totalPortfolioValue);
	});

	useEffect(() => {
		if (sessionUser) {
			dispatch(fetchUserPortfolio(sessionUser?.id));
			dispatch(fetchAllCompanies());
		}
	}, [dispatch, sessionUser?.id]);

	return (
		<div className="main-portfolio-container">
			{sessionUser && userPortfolio ? (
				<>
					<div className="main-left-container">
						<div className="user-info">
							<h2 className="portfolio-value">${totalPortfolioValue.toFixed(2)}</h2>
						</div>
						<LineChart />

						<div className="portfolio-buying-power-container">
							<p>Buying Power</p>
							<div>${sessionUser.balance.toFixed(2)}</div>
						</div>

            <div className="mod discover-mod">
              DISCOVER
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla
              </div>
            </div>
            <div className="mod trending-mod">
              TRENDING
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla
              </div>
            </div>
            <div className="mod learning-mod">
              LEARNING
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla
              </div>
            </div>
            <div className="mod news-mod">
              NEWS
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla
              </div>
            </div>
            <div className="About-container">
              <div>
                <h2>About Us</h2>
                <div className="socials-container">
                  <div className="ali-about">
                    Ali:{" "}
                    <a href="https://www.linkedin.com/in/alirezakeshanian/">
                      linkedin
                    </a>
                  </div>
                  <div className="malcolm-about">
                    Malcolm:
                    <a>email: malcolmcaleb01@gmail.com</a>
                    <a>github: @malcolmc22</a>
                  </div>
                  <div className="cory-about">
                    Cory
                    <a>email: corycampbell20@yahoo.com</a>
                    <a>github: @CoryCampbell</a>
                    <a>discord: monkeydcory</a>
                  </div>
                  <div className="quinn-about">
                    Quinn:{" "}
                    <a href="https://www.linkedin.com/in/quinlan-bush/">
                      linkedin
                    </a>
                  </div>
                </div>
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

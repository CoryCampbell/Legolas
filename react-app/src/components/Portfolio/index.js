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

  const userPortfolio = useSelector((state) =>
    Object.values(state.portfolio?.currentUserPortfolio)
  );
  console.log("userPortfolio", userPortfolio);

  let totalPortfolioValue = 0;

  userPortfolio?.map((stock) => {
    totalPortfolioValue += stock.price;
    console.log("totalPortfolioValue", totalPortfolioValue);
  });

  useEffect(() => {
    dispatch(fetchUserPortfolio(sessionUser?.id));
    dispatch(fetchAllCompanies());
  }, [dispatch, sessionUser?.id]);

  return (
    <div className="main-portfolio-container">
      {sessionUser && userPortfolio ? (
        <>
          <div className="main-left-container">
            <div className="user-info">
              <h2 className="portfolio-value">
                ${totalPortfolioValue.toFixed(2)}
              </h2>
            </div>
            <LineChart />

            <div>Buying Power: ${sessionUser.balance.toFixed(2)}</div>

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

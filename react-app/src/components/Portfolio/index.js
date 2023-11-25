import { useSelector, useDispatch } from "react-redux";
import Landing from "./Landing";
import "./Portfolio.css";
import LineChart from "../Chart/LineChart";
import { useEffect } from "react";
import {
  fetchCompany,
  fetchUserPortfolio,
  fetchWatchlists,
} from "../../store/portfolio";
import OpenModalButton from "../OpenModalButton"
import WatchListModal from "../WatchlistModal";

const Portfolio = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const info = useSelector((state) =>
    Object.values(state.portfolio.currentUserPortfolio)
  )[0];
  const company = useSelector((state) => state.portfolio.company);
  const watchlist = useSelector(
    (state) => state.portfolio.watchlists?.watchlists
  );
  console.log(watchlist, "test--------");
  useEffect(() => {
		dispatch(fetchUserPortfolio(sessionUser?.id));
		dispatch(fetchWatchlists(sessionUser?.id));
		dispatch(fetchCompany(info?.company_id));
	}, [dispatch, info?.company_id, sessionUser?.id]);

  return (
    <div className="main-portfolio-container">
      {sessionUser ? (
        info &&
        company &&
        watchlist && (
          <>
            <div className="main-left-container">
              <div className="company-info">
                <h1>{company.name}</h1>
              </div>
              <div className="user-info">
                <h2 className="portfolio-value">${sessionUser.balance}</h2>
              </div>
              <LineChart />

              <div>Buying Power: ${sessionUser.balance}</div>

              <div className="mod about-mod">
                ABOUT {company.symbol}
                <div>{company.about}</div>
              </div>
              <div className="mod discover-mod">DISCOVER</div>
              <div className="mod trending-mod">TRENDING</div>
              <div className="mod learning-mod">LEARNING</div>
              <div className="mod news-mod">NEWS</div>
            </div>
            <div className="main-list-container">
              <div>Lists</div>
			  <div>
          <OpenModalButton
            buttonText="Create a new Watchlist"
            modalComponent={<WatchListModal />}
            />
          </div>
              <div className="watchlist">
                {watchlist.map(
                  ({ symbol, price, company_name, company_id }) => (
                    <div>
                      Watchlist 1
                      <p>
                        {symbol} --graph here -- {price}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div className="watchlist">Watchlist 2</div>
              <div className="watchlist">Watchlist 3</div>
            </div>
          </>
        )
      ) : (
        <Landing />
      )}
    </div>
  );
};

export default Portfolio;

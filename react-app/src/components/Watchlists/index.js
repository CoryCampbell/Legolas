import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllWatchlists,
  fetchWatchlist,
  fetchWatchlistDetails,
} from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";
import MiniChart from "../Chart/MiniChart";
import "./watchlist.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteWatchListModal from "./DeleteModal";
import { fetchUserPortfolio } from "../../store/portfolio";
import { fetchAllCompanies } from "../../store/companies";

const Watchlist = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const watchlists = useSelector((state) => state.watchlists.allWatchlists);

  const userPortfolio = useSelector(
    (state) => state.portfolio.currentUserPortfolio
  );
  const allCompanies = useSelector((state) => state.companies.allCompanies);

  const userObj = Object.values(userPortfolio);


  //This newValue attribute will be used in future features to calculate the total percent change in stock value based on the price of the stock at the time of purchase compared to the price of the stock at the current time. For now we will use a newValue of Zero to indicate no change in value.

  // aggregates all data for stocks owned
  let formattedSharesData = [];

  userObj.forEach((share) => {

    // const company = await fetch(`/api/companies/${share.company_id}`);
    const shareObj = {
      company_id: share.company_id,
      newValue: share.price,
      shares: share.shares,
      price: share.price,
    };

    formattedSharesData.push(shareObj);
  });

  let watchlistArray;

  if (watchlists) {
    watchlistArray = Object.values(watchlists);
  }

  useEffect(() => {
    // dispatch(fetchAllCompanies());
    dispatch(fetchAllWatchlists(sessionUser?.id));
    dispatch(fetchUserPortfolio(sessionUser?.id));
  }, [dispatch, sessionUser?.id]);

  if (!sessionUser) {
    // If there's no user, you can display a message or take any other action
    return <div>No user found. Please log in.</div>;
  }

  return (
		<div className="main-watchlist-container">
			{sessionUser && (
				<>
					<div className="main-list-container">
						<div className="shares-owned-preview-container">
							<div className="my-shares-header">My Shares</div>
							{sessionUser &&
								formattedSharesData?.map((share) => {
									const company = allCompanies.length
										? allCompanies.find((company) => company.id === share.company_id)
										: null;

									if (!company) {
										return null;
									}
									return (
										<div className="main-share-container" key={share.company_id}>
											<div className="shares-info-container">
												<div>
													<NavLink to={`/companies/${company?.id}`}>{company?.symbol}</NavLink>
												</div>
												<div>
													{share.shares.toFixed(2)} {share.shares === 1 ? "Share" : "Shares"}
												</div>
											</div>
											<MiniChart className={"user-chart"} />
											<div className="shares-stats-container">
												<div>${(company.price * share.shares).toFixed(2)}</div>
												<div>{(share.newValue - share.price) * share.shares}%</div>
											</div>
										</div>
									);
								})}
						</div>
						<div className="list-header">
							Lists
							<div className="add-new-watchlist-button">
								<OpenModalButton buttonText="+" modalComponent={<WatchListModal />} />
							</div>
						</div>
						{sessionUser &&
							watchlistArray &&
							watchlistArray?.map((list) => (
								<div key={list?.id} className="watchlist-container">
									<NavLink exact to={`/watchlists/current/${list?.id}`}>
										{list?.name}
									</NavLink>
									<OpenModalButton
										className="delete-watchlist-button"
										buttonText="X"
										modalComponent={<DeleteWatchListModal companyId={list.id} />}
									></OpenModalButton>
								</div>
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default Watchlist;

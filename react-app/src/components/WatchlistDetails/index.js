import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllWatchlists, fetchWatchlistDetails } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";
import "./watchlistDetails.css";
import Watchlist from "../Watchlists";

const WatchlistDetails = () => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);

	const watchlists = useSelector((state) => Object.values(state.watchlists.allWatchlists));
	console.log("watchlists", watchlists);

	let currentWatchlist = useSelector((state) => state.watchlists.currentWatchlist);
	console.log("currentWatchlist ========>", currentWatchlist);

	useEffect(() => {
		dispatch(fetchAllWatchlists(sessionUser?.id));
		dispatch(fetchWatchlistDetails(currentWatchlist?.id));
	}, [dispatch, currentWatchlist?.id, sessionUser?.id]);

	return (
		<>
			{sessionUser && currentWatchlist && (
				<div className="watchlist-details-container">
					<div className="current-watchlist-left-container">
						<div className="current-watchlist-header-container">
							<div>{currentWatchlist.name}</div>
						</div>
						<div className="watchlist-table-container">
							<table>
								<tr>
									<th>Name</th>
									<th>Symbol</th>
									<th>Price</th>
									<th>Today</th>
									<th>Market Cap</th>
								</tr>
								{/* {currentWatchlist.map((company) => (
									<tr>
										<th>{company.name}</th>
										<th>{company.symbol}</th>
									</tr>
								))} */}
							</table>
						</div>
					</div>
					<Watchlist />
				</div>
			)}
		</>
	);
};

export default WatchlistDetails;

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllWatchlists, fetchWatchlistDetails } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";
import "./watchlistDetails.css";
import Watchlist from "../Watchlists";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const WatchlistDetails = () => {
	const { watchlist_id } = useParams();
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);

	const watchlists = useSelector((state) => Object.values(state.watchlists.allWatchlists));
	console.log("watchlists", watchlists);

	let currentWatchlist = useSelector((state) => state.watchlists.currentWatchlist);
	console.log("currentWatchlist ========>", currentWatchlist);

	useEffect(() => {
		dispatch(fetchAllWatchlists(sessionUser?.id));
		dispatch(fetchWatchlistDetails(watchlist_id));
	}, [dispatch, watchlist_id, sessionUser?.id]);

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
								{currentWatchlist.length &&
									currentWatchlist?.map((company) => (
										<tr key={company.id}>
											<th>{company.name}</th>
											<th>{company.symbol}</th>
										</tr>
									))}
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

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
	console.log("watchlist_id", watchlist_id);

	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);

	const watchlists = useSelector((state) => state.watchlists.allWatchlists);
	console.log("watchlists", watchlists);

	const currentWatchlistDetails = useSelector((state) => state.watchlists.currentWatchlist);
	console.log("currentWatchlistDetails ========>", currentWatchlistDetails);

	let currentWatchlist;

	if (watchlists.length) {
		watchlists?.forEach((watchlist) => {
			console.log("watchlist", watchlist.name);
			if (watchlist.id == watchlist_id) currentWatchlist = watchlist.name;
		});
	}

	useEffect(() => {
		dispatch(fetchAllWatchlists(sessionUser?.id));
		dispatch(fetchWatchlistDetails(watchlist_id));
	}, [dispatch, watchlist_id, sessionUser?.id]);

	return (
		<>
			{sessionUser && currentWatchlistDetails.length && (
				<div className="watchlist-details-container">
					<div className="current-watchlist-left-container">
						<div className="current-watchlist-header-container">
							<div>{currentWatchlist}</div>
						</div>
						<div className="watchlist-table-container">
							<table>
								<tbody>
									<tr>
										<th>Name</th>
										<th>Symbol</th>
										<th>Price</th>
										<th>Today</th>
										<th>Market Cap</th>
									</tr>
									{currentWatchlistDetails.length &&
										currentWatchlistDetails?.map((company) => (
											<tr key={company.id}>
												<th>{company.name}</th>
												<th>{company.symbol}</th>
											</tr>
										))}
								</tbody>
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

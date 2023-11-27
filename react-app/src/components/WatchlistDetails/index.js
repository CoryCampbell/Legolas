import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllWatchlists, fetchWatchlistDetails } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";
import "./watchlistDetails.css";
import Watchlist from "../Watchlists";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";

const WatchlistDetails = () => {
	const { watchlist_id } = useParams();
	console.log("watchlist_id", watchlist_id);

	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);

	const watchlists = useSelector((state) => state.watchlists.allWatchlists);
	console.log("watchlists", watchlists);

	const currentWatchlistDetails = useSelector((state) => state.watchlists.currentWatchlist);
	console.log("currentWatchlistDetails ========>", currentWatchlistDetails);

	// const currentWatchlist = Object.values(watchlists).filter((watchlist) => (watchlist.id = watchlist_id));

	let currentWatchlist;

	if (watchlists?.length) {
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
			{sessionUser && (
				<div className="watchlist-details-container">
					<div className="current-watchlist-left-container">
						<div className="current-watchlist-header-container">
							<div className="current-watchlist-header">{currentWatchlist}</div>
						</div>
						{currentWatchlistDetails ? (
							<div className="watchlist-table-container">
								<table>
									<thead className="legend-row">
										<th>Name</th>
										<th>Symbol</th>
										<th>Price</th>
									</thead>
									<tbody>
										{currentWatchlistDetails.length ? (
											currentWatchlistDetails?.map((company) => (
												<tr key={company.id} className="company-row-container">
													<NavLink exact to={`/companies/${company.id}`}>
														<td className="listdet-company-name">{company.name}</td>
														<td className="listdet-company-symbol">{company.symbol}</td>
														<td className="listdet-company-price">{company.price}</td>
													</NavLink>
												</tr>
											))
										) : (
											<p>Add companies to your watchlist to view here</p>
										)}
									</tbody>
								</table>
							</div>
						) : (
							<p>no data</p>
						)}
					</div>
					<Watchlist />
				</div>
			)}
		</>
	);
};

export default WatchlistDetails;

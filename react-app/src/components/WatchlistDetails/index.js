import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllWatchlists, fetchWatchlistDetails } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";
import "./watchlistDetails.css";
import Watchlist from "../Watchlists";

const WatchlistDetails = () => {
	const dispatch = useDispatch();

	const currentWatchlist = useSelector((state) => state.watchlists.currentWatchlist);
	console.log("currentWatchlist", currentWatchlist);

	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(fetchWatchlistDetails(currentWatchlist?.id));
	}, [dispatch, currentWatchlist?.id, sessionUser?.id]);

	return (
		<>
			{sessionUser && currentWatchlist && (
				<div className="watchlist-details-container">
					<div>"watchlist details page"</div>
					<Watchlist />
				</div>
			)}
		</>
	);
};

export default WatchlistDetails;

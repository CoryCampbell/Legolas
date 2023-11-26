import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllWatchlists, fetchWatchlist } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";

const WatchlistDetails = () => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	const watchlistsState = useSelector((state) => state.watchlists.allWatchlists);
	const watchlists = [watchlistsState];
	const currentWatchlist = useSelector((state) => state.watchlists.currentWatchlist);
	console.log("currentWatchlist", currentWatchlist);

	useEffect(() => {
		dispatch(fetchWatchlist(currentWatchlist?.id));
	}, [dispatch, currentWatchlist?.id]);

	return "watchlist details page";
};

export default WatchlistDetails;

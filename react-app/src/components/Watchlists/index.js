import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllWatchlists, fetchWatchlist } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";

const Watchlist = () => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	console.log("sessionUser", sessionUser);

	const watchlistsState = useSelector((state) => state.watchlists.allWatchlists);
	const watchlists = [watchlistsState];

	console.log("allWatchlists =======>", watchlists);

	useEffect(() => {
		dispatch(fetchAllWatchlists(sessionUser?.id));
	}, [dispatch, sessionUser?.id]);

	return (
		<div className="main-portfolio-container">
			{sessionUser && (
				<>
					<div className="main-list-container">
						<div>Lists</div>
						<div>
							<OpenModalButton buttonText="Create a new Watchlist" modalComponent={<WatchListModal />} />
						</div>
						{watchlists.map((list) => (
							<div key={list}>
								<div className="ticker">{list.symbol}</div>
								<div className="mini-graph">graph</div>
								<div className="list-stats-container">
									<div className="current-share-price">share price</div>
									<div className="current-percent-change">percent change</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Watchlist;

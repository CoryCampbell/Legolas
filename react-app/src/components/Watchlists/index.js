import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllWatchlists, fetchWatchlist, fetchWatchlistDetails } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";
import MiniChart from "../Chart/MiniChart";
import "./watchlist.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Watchlist = () => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	const watchlists = useSelector((state) => Object.values(state.watchlists.allWatchlists));
	const currentWatchlist = watchlists[0];
	console.log("watchlists", watchlists);

	useEffect(() => {
		dispatch(fetchAllWatchlists(sessionUser?.id));
		dispatch(fetchWatchlistDetails(currentWatchlist?.id));
	}, [dispatch, sessionUser?.id, currentWatchlist?.id]);

	return (
		<div className="main-watchlist-container">
			{sessionUser && (
				<>
					<div className="main-list-container">
						<div className="shares-owned-preview-container">
							<div className="my-shares-header">My Shares</div>
							<div className="main-share-container">
								<div className="shares-info-container">
									<div>shares symbol</div>
									<div>shares owned</div>
								</div>
								<MiniChart className={"user-chart"} />
								<div className="shares-stats-container">
									<div>share price</div>
									<div>percent change</div>
								</div>
							</div>
						</div>
						<div className="list-header">
							Lists
							<div>
								<OpenModalButton buttonText="+" modalComponent={<WatchListModal />} />
							</div>
						</div>
						{sessionUser &&
							watchlists?.map((list) => (
								<div key={list?.id} className="watchlist-container">
									<NavLink to={`/watchlists/current/${list?.id}`}>{list?.name}</NavLink>
								</div>
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default Watchlist;


/* <div className="ticker">{list.symbol}watchlist ticker symbol</div>
		<div className="mini-graph">graph</div>
		<div className="list-stats-container">
		<div className="current-share-price">{list.price}share price</div>
		<div className="current-percent-change">percent change</div>
	</div> */

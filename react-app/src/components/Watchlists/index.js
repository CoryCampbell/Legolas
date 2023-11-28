import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllWatchlists, fetchWatchlist, fetchWatchlistDetails } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import WatchListModal from "../WatchlistModal";
import MiniChart from "../Chart/MiniChart";
import "./watchlist.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteWatchListModal from "./DeleteModal";

const Watchlist = () => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	const watchlists = useSelector((state) => state.watchlists.allWatchlists);
	let watchlistArray;

	if (watchlists) {
		watchlistArray = Object.values(watchlists);
	}
	console.log("========> watchlists", watchlists);

	useEffect(() => {
		dispatch(fetchAllWatchlists(sessionUser?.id));
	}, [dispatch, sessionUser?.id]);

	return (
		<div className="main-watchlist-container">
			{sessionUser && (
				<>
					<div className="main-list-container">
						<div className="shares-owned-preview-container">
							<div className="my-shares-header">My Shares</div>
							<div className="main-share-container">
								<div className="shares-info-container">
									<div>symbol</div>
									<div>#owned</div>
								</div>
								<MiniChart className={"user-chart"} />
								<div className="shares-stats-container">
									<div>$/share</div>
									<div>% -/+</div>
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
							watchlistArray &&
							watchlistArray?.map((list) => (
								<div key={list?.id} className="watchlist-container">
									<NavLink exact to={`/watchlists/current/${list?.id}`}>
										{list?.name}
									</NavLink>
									<OpenModalButton className='delete-watchlist-button' buttonText="X" modalComponent={<DeleteWatchListModal companyId={list.id} />}></OpenModalButton>
								</div>
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default Watchlist;

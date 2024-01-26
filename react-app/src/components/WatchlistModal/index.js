import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addNewWatchlistThunk, fetchAllWatchlists, fetchWatchlistDetails } from "../../store/watchlists";
import "./watchlistModal.css";

function WatchListModal(user_id) {
	const dispatch = useDispatch();
	const [watchlistName, setWatchlistName] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const sessionUser = useSelector((state) => state.session.user);
	const currentWatchlist = useSelector((state) => state.watchlists.currentWatchlist);

	const handleCancel = () => {
		closeModal();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(addNewWatchlistThunk(watchlistName));
		if (data) {
			setErrors(data);
		}
		setWatchlistName("");
		closeModal();
	};

	useEffect(() => {
		dispatch(fetchAllWatchlists(sessionUser?.id));
	}, [dispatch, sessionUser?.id]);

	return (
		<div className="add-watchlist-container">
			<h1 className="add-watchlist-header">Create a Watchlist</h1>
			<form onSubmit={handleSubmit} className="form-container">
				<input
					placeholder="Watchlist name"
					type="text"
					value={watchlistName}
					onChange={(e) => setWatchlistName(e.target.value)}
				/>
				<div className="buttons-container">
					<button type="submit" className="submit-new-watchlist">
						Create
					</button>
					<button type="button" className="cancel-new-watchlist" onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default WatchListModal;

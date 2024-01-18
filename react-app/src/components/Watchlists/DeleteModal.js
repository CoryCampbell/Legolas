import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { deleteWatchlistThunk } from "../../store/watchlists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function DeleteWatchListModal({ companyId }) {
	const [watchlistName, setWatchlistName] = useState("");
	const [companySymbols, setCompanySymbols] = useState([]);
	const { closeModal } = useModal();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const deleteWatchlist = await dispatch(deleteWatchlistThunk(companyId));
		closeModal();
	};
    const handleSubmit = async (e) => {
			e.preventDefault();
            const deleteWatchlist = await dispatch(deleteWatchlistThunk(companyId))
			closeModal();
		};

    return (
			<div className="delete-watchlist-modal">
				<h1 className="delete-watchlist-title">Delete Watchlist</h1>
				<div className="delete-watchlist-confirm">Are you sure you want to delete this watchlist?</div>
				<form onSubmit={handleSubmit}>
					<div className="delete-watchlist-button-container">
						<button type="submit" className="delete-watchlist-button">
							Yes
						</button>
						<button className="dont-delete-watchlist-button" onClick={closeModal}>
							No
						</button>
					</div>
				</form>
			</div>
		);
}

export default DeleteWatchListModal;

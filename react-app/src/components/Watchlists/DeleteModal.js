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

	return (
		<>
			<div className="watchlist-delete-modal-container">
				<div className="watchlist-delete-upper-container">
					<FontAwesomeIcon onClick={() => closeModal()} icon={faXmark} />
					{/* <i onClick={() => {closeModal()}} className="fa-solid fa-xmark fa-2xl"></i> */}
					<h1 className="watchlist-delete-title">Delete Watchlist</h1>
				</div>
				<div className="watchlist-confirmation">Are you sure you want to delete this watchlist?</div>
				<div className="watchlist-cancel-ok">
					<form onSubmit={handleSubmit}>
						<button type="submit" className="watchlist-confirm-delete-button">
							Yes
						</button>
						<button className="watchlist-cancel-delete-button" onClick={closeModal}>
							No
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default DeleteWatchListModal;

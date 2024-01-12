import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useSelector, useDispatch } from "react-redux";
import { deleteWatchlistThunk } from "../../store/watchlists";

function DeleteWatchListModal({companyId}) {

    const [watchlistName, setWatchlistName] = useState("");
    const [companySymbols, setCompanySymbols] = useState([])
    const { closeModal } = useModal()
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
			e.preventDefault();
            const deleteWatchlist = await dispatch(deleteWatchlistThunk(companyId))
			closeModal();
		};

    return (
			<>
				<h1>Delete Watchlist</h1>
                <div>Are you sure you want to delete this watchlist?</div>
				<form onSubmit={handleSubmit}>
					<button type="submit" className="delete-watchlist-button">Yes</button>
                    <button className="dont-delete-watchlist-button" onClick={closeModal}>No</button>
				</form>
			</>
		);
}

export default DeleteWatchListModal

import { useState } from "react"
import { useModal } from "../../context/Modal"
import { deleteCompanyThunk } from "../../store/watchlists";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/";

function DeleteCompanyFromWatchListModal({companyId, watchlistId}) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [watchlistName, setWatchlistName] = useState("");
    const [companySymbols, setCompanySymbols] = useState([])
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
			e.preventDefault();
            const deleteCompany = await dispatch(deleteCompanyThunk(companyId,watchlistId))
			closeModal();
		};

    return (
			<>
				<h1>Delete Company</h1>
                <div>Are you sure you want to delete this company?</div>
				<form onSubmit={handleSubmit}>
					<button type="submit" className="delete-company-button">Yes</button>
                    <button className="dont-delete-company-button" onClick={closeModal}>No</button>
				</form>
			</>
		);
}

export default DeleteCompanyFromWatchListModal

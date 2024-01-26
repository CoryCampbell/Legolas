import { useModal } from "../../context/Modal";
import { deleteCompanyThunk } from "../../store/watchlists";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function DeleteCompanyFromWatchListModal({ companyId, watchlistId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const handleConfirm = async (e) => {
		e.preventDefault();
		const deleteCompany = await dispatch(deleteCompanyThunk(companyId, watchlistId));
		closeModal();
	};

	return (
		<div className="company-delete-modal-container">
			<div className="company-delete-upper-container">
				<FontAwesomeIcon onClick={() => closeModal()} icon={faXmark} />
				<h1 className="company-delete-title">Delete Company</h1>
			</div>
			<div className="company-confirmation">Are you sure you want to delete this company?</div>
			<div className="company-cancel-ok">
				<form onSubmit={handleConfirm}>
					<button type="submit" className="company-confirm-delete-button">
						Yes
					</button>
					<button className="company-cancel-delete-button" onClick={closeModal}>
						No
					</button>
				</form>
			</div>
		</div>
	);
}

export default DeleteCompanyFromWatchListModal;

import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import { addNewWatchlistThunk } from "../../store/watchlists";

function WatchListModal() {
	const dispatch = useDispatch();
	const [watchlistName, setWatchlistName] = useState("");
	const [errors, setErrors] = useState([]);
	// const [companySymbols, setCompanySymbols] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(addNewWatchlistThunk(watchlistName));
		if (data) {
			setErrors(data);
		}
		closeModal();

		setWatchlistName("");
	};

	return (
		<>
			<h1>Create a Watchlist</h1>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Watchlist name"
					type="text"
					value={watchlistName}
					onChange={(e) => setWatchlistName(e.target.value)}
					required
				/>
				{/* <input
                placeholder="Company name's (seperated by commas)"
                type="text"
                value={companySymbols}
                onChange={(e) => setCompanySymbols(e.target.value)}
                required
            /> */}
				<button type="submit">Create Watchlist</button>
			</form>
		</>
	);
}

export default WatchListModal

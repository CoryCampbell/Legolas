import { useState } from "react"
import { useModal } from "../../context/Modal"

function WatchListModal() {
    const [watchlistName, setWatchlistName] = useState("");
    const [companySymbols, setCompanySymbols] = useState([])
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
			e.preventDefault();
			closeModal();
		};

    return (
        <>
        <h1>Create a Watchlist</h1>
        <form>
            <input
                placeholder="Watchlist name"
                type="text"
                value={watchlistName}
                onChange={(e) => setWatchlistName(e.target.value)}
                required
            />
            <input
                placeholder="Company name's (seperated by commas)"
                type="text"
                value={companySymbols}
                onChange={(e) => setCompanySymbols(e.target.value)}
                required
            />
            <button type="submit">Create Watchlist</button>
        </form>
        </>
    )
}

export default WatchListModal

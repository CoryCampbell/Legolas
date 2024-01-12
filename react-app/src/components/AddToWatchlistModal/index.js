import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchAllWatchlists } from "../../store/watchlists";
import "./AddToWatchlist.css";

const AddToWatchlistModal = ({ company_id }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const watchlists = useSelector((state) => state.watchlists.allWatchlists);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  let watchlistArray;

  if (watchlists) {
    watchlistArray = Object.values(watchlists);
  }

  const handleWatchlistClick = async (watchlist) => {
    const watchlist_id = watchlist.id;

    try {
      const res = await fetch(`/api/watchlists/${watchlist_id}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company_id }),
      });

      if (res.ok) {
        window.alert(`Added to ${watchlist.name} successfully!`);
        closeModal();
      } else {
        const data = await res.json();
        window.alert(`Error: ${data.error}`);
        // closeModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllWatchlists(sessionUser?.id));
  }, [dispatch, sessionUser?.id]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Your Watchlists</h2>
        <ul>
          {watchlistArray.map((watchlist) => (
            <li
              key={watchlist.id}
              onClick={() => handleWatchlistClick(watchlist)}
              className="add-to-watchlists-lists"
            >
              {watchlist.name}
            </li>
          ))}
        </ul>
        <button className="close-modal-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddToWatchlistModal;

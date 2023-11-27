const GET_WATCHLIST = "watchlists/getWatchlist";
const GET_ALL_WATCHLISTS = "watchlists/getAllWatchlists";
const ADD_NEW_WATCHLIST = "watchlists/getAllWatchlists";

//Action Creator
const getWatchlist = (payload) => {
	return {
		type: GET_WATCHLIST,
		payload
	};
};

const getAllWatchlists = (payload) => {
	return {
		type: GET_ALL_WATCHLISTS,
		payload
	};
};

const addNewWatchlist = (payload) => {
	return {
		type: ADD_NEW_WATCHLIST,
		payload
	};
};

//Thunk
export const fetchWatchlistDetails = (watchlist_id) => async (dispatch) => {
	console.log("watchlist_id", watchlist_id);
	const res = await fetch(`/api/watchlists/current/${watchlist_id}`);

	const data = await res.json();
	dispatch(getWatchlist(data));
	return data;
};

export const fetchAllWatchlists = (user_id) => async (dispatch) => {
	const res = await fetch(`/api/watchlists/users/${user_id}`);

	const data = await res.json();
	dispatch(getAllWatchlists(data));
	return data;
};

export const addNewWatchlistThunk = (watchlistName) => async (dispatch) => {
	// console.log("=====================> watchlistName", watchlistName);
	const res = await fetch(`/api/watchlists/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: watchlistName
		})
	});

	const data = await res.json();
	dispatch(addNewWatchlist(data));
	return data;
};

const initialState = {
	allWatchlists: {},
	currentWatchlist: {}
};

// Reducer
export const watchlistReducer = (state = initialState, action) => {
	const allWatchlistsAfterAddition = { ...state.allWatchlists, newWatchlist: action.payload };
	switch (action.type) {
		case GET_WATCHLIST:
			return {
				...state,
				currentWatchlist: action.payload
			};

		case GET_ALL_WATCHLISTS:
			return {
				...state,
				allWatchlists: action.payload

				// 	allWatchlists: {
				// 		action.payload.map((watchlist) => {
				// 		[watchlist.name]: watchlist
				// 	})
				// };
			};

		case ADD_NEW_WATCHLIST:
			return {
				...state,
				allWatchlists: allWatchlistsAfterAddition
			};

		default:
			return state;
	}
};

export default watchlistReducer;

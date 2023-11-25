const GET_WATCHLIST = "watchlists/getWatchlist";
const GET_ALL_WATCHLISTS = "watchlists/getAllWatchlists";

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

//Thunk
export const fetchWatchlist = (watchlist_id) => async (dispatch) => {
	const res = await fetch(`/api/watchlists/${watchlist_id}`);

	const data = await res.json();
	dispatch(getWatchlist(data));
	return data;
};

export const fetchAllWatchlists = (user_id) => async (dispatch) => {
	const res = await fetch(`/api/watchlists/${user_id}`);

	const data = await res.json();
	dispatch(getAllWatchlists(data));
	return data;
};

const initialState = {
	allWatchlists: {},
	currentWatchlist: {}
};

// Reducer
export const watchlistReducer = (state = initialState, action) => {
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
			};

		default:
			return state;
	}
};

export default watchlistReducer;

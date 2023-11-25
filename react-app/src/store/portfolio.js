const GET_USER_PORTFOLIO = "portfolio/getUserPortfolio";
const GET_WATCHLISTS = "watchlists/userWatchlists";
//Action Creator
const getUserPortfolio = (payload) => {
	return {
		type: GET_USER_PORTFOLIO,
		payload
	};
};

const getWatchlists = (payload) => {
	return {
		type: GET_WATCHLISTS,
		payload
	};
};

//Thunk
export const fetchUserPortfolio = (user_id) => async (dispatch) => {
	const response = await fetch(`/api/portfolio/${user_id}`, {
		method: "GET"
	});

	const userPortfolio = await response.json();
	// console.log(userPortfolio)
	dispatch(getUserPortfolio(userPortfolio));
	return userPortfolio;
};

export const fetchWatchlists = (user_id) => async (dispatch) => {
	const res = await fetch(`/api/watchlists/${user_id}`);

	const data = await res.json();
	dispatch(getWatchlists(data));
	return data;
};

const initialState = {
	currentUserPortfolio: {}
};

// Reducer
export const portfolioReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_PORTFOLIO:
			return {
				...state,
				currentUserPortfolio: action.payload
			};

		case GET_WATCHLISTS:
			return {
				...state,
				watchlists: action.payload
			};
		default:
			return state;
	}
};

export default portfolioReducer;

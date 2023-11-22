const GET_USER_PORTFOLIO = "portfolio/getUserPortfolio";

//Action Creator
const getUserPortfolio = (payload) => {
	return {
		type: GET_USER_PORTFOLIO,
		payload
	};
};

//Thunk
export const fetchUserPortfolio = (user_id) => async (dispatch) => {
	const response = await fetch(`/api/portfolio/${user_id}`, {
		method: "GET"
	});

	const userPortfolio = await response.json();

	dispatch(getUserPortfolio(user_id));
	return userPortfolio;
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

		default:
			return state;
	}
};

export default portfolioReducer;
const GET_USER_PORTFOLIO = "portfolio/getUserPortfolio";
//Action Creator
const getUserPortfolio = (payload) => {
  return {
    type: GET_USER_PORTFOLIO,
    payload,
  };
};

//Thunk

export const fetchUserPortfolio = (user_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/portfolio/${user_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user portfolio. Status: ${response.status}`
      );
    }

    const userPortfolio = await response.json();
    dispatch(getUserPortfolio(userPortfolio));
    return userPortfolio;
  } catch (error) {
    // Handle the error according to your application's needs
    console.error("Error fetching user portfolio:", error.message);
    // Optionally, you can dispatch an action to store the error in the Redux state
    // dispatch(setError(error.message));
    throw error; // Rethrow the error to propagate it further
  }
};

const initialState = {
  currentUserPortfolio: {},
};

// Reducer
export const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PORTFOLIO:
      return {
        ...state,
        currentUserPortfolio: action.payload,
      };

    default:
      return state;
  }
};

export default portfolioReducer;

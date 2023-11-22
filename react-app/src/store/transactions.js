const GET_USER_TRANSACTIONS = "transactions/getUserTransactions";

// Action Creator
const getUserTransactions = (payload) => {
  return {
    type: GET_USER_TRANSACTIONS,
    payload,
  };
};

// Thunk
export const getUserTransactionsThunk = (user_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/transactions/${user_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      // Handle error if the response status is not OK
      throw new Error("Failed to fetch user transactions");
    }

    const userTransactions = await response.json();

    dispatch(getUserTransactions(userTransactions));
    return userTransactions;
  } catch (error) {
    console.error("Error fetching user transactions:", error.message);
    // Optionally, you might want to dispatch an action for error handling
  }
};

// Initial state
const initialState = {
  currentUserTransactions: {},
};

// Reducer
const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_TRANSACTIONS:
      return {
        ...state,
        currentUserTransactions: action.payload,
      };
    default:
      return state;
  }
};

export default transactionsReducer;

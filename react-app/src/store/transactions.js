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
	const response = await fetch(`/api/transactions/${user_id}`);

	const data = await response.json();

	dispatch(getUserTransactions(data));
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

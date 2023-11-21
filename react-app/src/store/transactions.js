const GET_USER_TRANSACTIONS = "transactions/getUserTransactions";

//Action Creator
const getUserTransactions = (payload) => {
  return {
    type: GET_USER_TRANSACTIONS,
    payload,
  };
};

//Thunk
export const getUserTransactionsThunk = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${user_id}`, {
    method: "GET",
  });

  const userTransactions = await response.json();

  dispatch(getUserTransactions(user_id));
  return userTransactions;
};

// initial state
const initialState = {
  currentUserTransactions: {},
};

//Reducer
export const transactionsReducer = (state = initialState, action) => {
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

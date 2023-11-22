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
  // console.log(user_id);
  const response = await fetch(`/api/transactions/${user_id}`);
  console.log("response -------->", response);
  const data = await response.json();
  console.log("data -------->", data);
  dispatch(getUserTransactions(data));
};

// Initial state
const initialState = {
  currentUserTransactions: {},
};

// Reducer
const transactionsReducer = (state = initialState, action) => {
  console.log("action -------->", action);
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

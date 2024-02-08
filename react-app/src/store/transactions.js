const GET_USER_TRANSACTIONS = "transactions/getUserTransactions";
const ADD_FUNDS = 'transactions/AddFunds'

// Action Creator
const getUserTransactions = (payload) => {
  return {
    type: GET_USER_TRANSACTIONS,
    payload,
  };
};

const addFunds = (user_id, amount) => {
  return {
    type: ADD_FUNDS,
    user_id,
    amount
  }
}

// Thunk
export const getUserTransactionsThunk = (user_id) => async (dispatch) => {
	const response = await fetch(`/api/transactions/${user_id}`);

	const data = await response.json();

	dispatch(getUserTransactions(data));
};

export const AddFundsThunk = (user_id, amount) => async (dispatch) => {
  const response = await fetch("/api/addfunds/add_funds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id, amount: parseFloat(amount) })
  });

  const data = await response.json();
  console.log(data)
  dispatch(addFunds(user_id,amount))

}
// Initial state
const initialState = {
  currentUserTransactions: {},
};

// Reducer
const transactionsReducer = (state = initialState, action) => {
  const transactionsUpdated = {...state.currentUserTransactions}
  switch (action.type) {
    case GET_USER_TRANSACTIONS:
      return {
        ...state,
        currentUserTransactions: action.payload,
      };
    case ADD_FUNDS: {
      console.log(state)
      return {
        ...state,
        currentUserTransactions: [transactionsUpdated]
      }
    }
    default:
      return state;
  }
};

export default transactionsReducer;

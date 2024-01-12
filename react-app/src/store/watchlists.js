const GET_WATCHLIST = "watchlists/getWatchlist";
const GET_ALL_WATCHLISTS = "watchlists/getAllWatchlists";
const ADD_NEW_WATCHLIST = "watchlists/getWatchlistsDetails";
const DELETE_COMPANY ='watchlists/deleteCompany';
const DELETE_WATCHLIST ='watchlists/deleteWatchlist'

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

const deleteCompany = (comnpanyId, watchlistId) => {
	return {
		type: DELETE_COMPANY,
		comnpanyId,
		watchlistId
	}
}

const deleteWatchlist = (watchlistId) => {
	return {
		type: DELETE_WATCHLIST,
		watchlistId
	}
}
//Thunk
export const fetchWatchlistDetails = (watchlist_id) => async (dispatch) => {

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

export const deleteCompanyThunk = (companyid, watchlistId) => async (dispatch) => {
	const res = await fetch(`/api/watchlists/${watchlistId}/delete/${companyid}`, {
		method: 'DELETE'
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(deleteCompany(companyid, watchlistId))
	} else {
		const errors = await res.json();
		return errors
	}
}

export const deleteWatchlistThunk = (watchlistId) => async (dispatch) => {
	const res = await fetch(`/api/watchlists/${watchlistId}/delete`, {
		method: 'DELETE'
	})

	if (res.ok) {
		const data = await res.json();
		dispatch(deleteWatchlist(watchlistId))
	} else {
		const errors = await res.json();
		return errors
	}
}

const initialState = {
	allWatchlists: {},
	currentWatchlist: {}
};

// Reducer
export const watchlistReducer = (state = initialState, action) => {
	// const allWatchlistsAfterAddition = { ...state.allWatchlists, newWatchlist: action.payload };
	switch (action.type) {
		case GET_WATCHLIST:
			return {
				...state,
				currentWatchlist: action.payload
			};
		case DELETE_WATCHLIST: {
			const newState = {...state}
			const newArray = newState.allWatchlists

			const toDelete = newArray.find((ele) => ele.id == action.watchlistId)
			for (let i = 0; i <newArray.length; i++) {
				const currObj = newArray[i]
				if (currObj.id == toDelete.id) {
					newArray.splice(i,1)
				}
			}


			return {
				...state,
				allWatchlists: [...newArray]
			}
		}
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
				allWatchlists: [...state.allWatchlists, action.payload]
			};
		case DELETE_COMPANY:
			const newState = {...state}
			const obj = newState.currentWatchlist

			const toDelete = newState.currentWatchlist.find((ele)=> ele.id == action.comnpanyId)
			for (let i = 0; i < obj.length; i++) {
				const currObj = obj[i]
				if (currObj.id == toDelete.id) {
					obj.splice(i,1)
				}
			}

			return {...state, currentWatchlist: [...obj]}
		default:
			return state;
	}
};

export default watchlistReducer;

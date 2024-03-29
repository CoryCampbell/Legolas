const GET_COMPANY = "companies/getCompany";
const GET_ALL_COMPANIES = "companies/getAllCompanies";

//Action Creator
const getCompany = (payload) => {
  return {
    type: GET_COMPANY,
    payload,
  };
};

const getAllCompanies = (payload) => {
  return {
    type: GET_ALL_COMPANIES,
    payload,
  };
};

//Thunk

export const fetchCompany = (company_id) => async (dispatch) => {
	const res = await fetch(`/api/companies/${company_id}`);

	const data = await res.json();
	dispatch(getCompany(data));
	return data;
};

export const fetchAllCompanies = () => async (dispatch) => {
  const res = await fetch(`/api/companies/all`);

  const data = await res.json();
  dispatch(getAllCompanies(data));
  return data;
};

const initialState = {
	company: {},
	allCompanies: {}
};

// Reducer
export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY:
      return {
        ...state,
        company: action.payload,
      };

    case GET_ALL_COMPANIES:
      return {
        ...state,
        allCompanies: action.payload,
      };

    default:
      return state;
  }
};

export default companyReducer;

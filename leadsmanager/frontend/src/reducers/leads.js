import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types";

const initialState = {
  leads: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload, // from backend
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload), // from backend
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: [].concat(state.leads, [action.payload]), // from backend
      };
    default:
      return state;
  }
}

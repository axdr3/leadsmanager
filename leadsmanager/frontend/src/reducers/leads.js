import { GET_LEADS, DELETE_LEAD, ADD_LEAD, EDIT_LEAD } from "../actions/types";

const initialState = {
  leads: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload),
      };
    case EDIT_LEAD:
      const index = state.leads.findIndex(
        (lead) => lead.id === action.payload.id
      );
      let arr = state.leads;
      arr[index] = { ...action.payload };
      state.leads = arr;
      console.log("arr", arr);
      console.log("state.leads", state.leads);
      return {
        ...state,
        leads: arr,
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: [].concat(state.leads, [action.payload]),
      };
    default:
      return state;
  }
}

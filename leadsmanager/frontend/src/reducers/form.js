import { FORM_RESET, FORM_UPDATE } from "../actions/types";

const initialState = {
  name: "",
  email: "",
  message: "",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case FORM_RESET:
      return state;
    case FORM_UPDATE:
      console.log(state, action);
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
}

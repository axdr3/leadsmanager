import { FORM_RESET, FORM_UPDATE } from "./types";

export const formReset = () => {
  return {
    type: FORM_RESET,
  };
};
export const formUpdate = (name, value) => {
  return {
    type: FORM_UPDATE,
    action: { name: name, value: value },
  };
};

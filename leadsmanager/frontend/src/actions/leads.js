import { createMessage, returnErrors } from "./messages";
import { axiosInstance } from "../axiosApi";
import { tokenConfig } from "./auth";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// dispatch is async request
// GET_LEADS
export const getLeads = () => (dispatch, getState) => {
  axiosInstance
    .get("/leads/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: GET_LEADS, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE_LEAD

export const deleteLead = (id) => (dispatch, getState) => {
  axiosInstance
    .delete(`/leads/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ leadDeleted: "Lead Deleted" }));
      dispatch({ type: DELETE_LEAD, payload: id });
    })
    .catch((err) => console.log(err));
};

// ADD_LEAD

export const addLead = (lead) => (dispatch, getState) => {
  axiosInstance
    .post("/leads/", lead, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ leadAdded: "Lead Added" }));
      dispatch({ type: ADD_LEAD, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

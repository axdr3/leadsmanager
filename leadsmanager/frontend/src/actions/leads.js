import { createMessage, returnErrors } from "./messages";
import { axiosInstance } from "../axiosApi";
import { tokenConfig } from "./auth";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, EDIT_LEAD } from "./types";

// dispatch is async request
// GET_LEADS
export const getLeads = () => (dispatch, getState) => {
  axiosInstance
    .get("/leads/", tokenConfig(getState))
    .then((response) => {
      dispatch({ type: GET_LEADS, payload: response.data });
    })
    .catch((error) =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

// DELETE_LEAD

export const deleteLead = (id) => (dispatch, getState) => {
  axiosInstance
    .delete(`/leads/${id}/`, tokenConfig(getState))
    .then((response) => {
      dispatch(createMessage({ leadDeleted: "Lead Deleted" }));
      dispatch({ type: DELETE_LEAD, payload: id });
    })
    .catch((error) => console.log(error));
};

// ADD_LEAD

export const addLead = (lead) => (dispatch, getState) => {
  axiosInstance
    .post("/leads/", lead, tokenConfig(getState))
    .then((response) => {
      dispatch(createMessage({ leadAdded: "Lead Added" }));
      dispatch({ type: ADD_LEAD, payload: response.data });
    })
    .catch((error) =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

// EDIT_LEAD

export const editLead = (id, lead) => (dispatch, getState) => {
  axiosInstance
    .put(`/leads/${id}/`, lead, tokenConfig(getState))
    .then((response) => {
      dispatch(createMessage({ leadAdded: "Lead Edited" }));
      dispatch({ type: EDIT_LEAD, payload: response.data });
    })
    .catch((error) =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

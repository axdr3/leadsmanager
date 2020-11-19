import { axiosInstance } from "../axiosApi";
import { returnErrors, createMessage } from "./messages";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// CHECK TOKEN & LOAD USER

export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  axiosInstance
    .get("/auth/user/", tokenConfig(getState))
    .then((response) => {
      // console.log(response.data);
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Login User

export const login = (username, password) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axiosInstance
    .post("/auth/login/", body, config)
    .then((response) => {
      // should return user, access_token, refresh_token
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

// Register
export const registerUser = ({ username, email, password }) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axiosInstance
    .post("/auth/register/", body, config)
    .then((response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      dispatch(createMessage({ registerSuccess: "Successfully registered" }));
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: REGISTER_FAIL });
    });
};

// Logout

export const logout = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axiosInstance
    .post("/auth/logout/", { refresh_token: getState().auth.refresh_token })
    .then((response) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      axiosInstance.defaults.headers["Authorization"] = null;
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      // dispatch({ type: AUTH_ERROR });
    });
};

// Setup config with token - helper function

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.access_token;
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(config);
  // if token add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

import axios from "axios";
import store from "./store";
import { TOKEN_REFRESH, TOKEN_EXPIRED } from "./actions/types";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const { dispatch } = store;
    // Prevent infinite loops early
    if (
      error.response.status === 401 &&
      originalRequest.url === "http://127.0.0.1:8000/api/token/refresh/"
    ) {
      window.location.href = "#/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!!refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
        console.log("tokenparts", tokenParts);
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              // localStorage.setItem("access_token", response.data.access);
              // localStorage.setItem("refresh_token", response.data.refresh);
              dispatch({ type: TOKEN_REFRESH, payload: response.data });
              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return axiosInstance(originalRequest); // send original request again
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          dispatch({ type: TOKEN_EXPIRED });

          window.location.href = "/#/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/#/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;

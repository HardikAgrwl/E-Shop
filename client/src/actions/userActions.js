import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "../components/layout/toastComponent";
import { returnErrors } from "./errorActions";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const token = getState().user.token;

  // Headers

  if (token) {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("/api/user", config)
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: AUTH_ERROR });
      });
  } else {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    axios
      .post("/api/register", body, config)
      .then((res) => {
        toast.success("Registered Successfully", toastConfig);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //request body
    const body = JSON.stringify({ email, password });

    axios
      .post("/api/login", body, config)
      .then((res) => {
        toast.success("Login Successfull", toastConfig);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const logout = () => {
  toast.success("Logged Out Successfull", toastConfig);
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  //Get token from local storage
  const token = getState().user.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
};

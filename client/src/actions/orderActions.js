import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  ADD_ORDER,
  ADD_PAYMENT_METHOD,
  CHECKOUT,
  GET_ORDERS,
  ORDERS_LOADING,
} from "./types";

export const getOrders = (id) => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get(`/api/order/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addOrder = (order) => (dispatch) => {
  dispatch({
    type: ADD_ORDER,
    payload: order,
  });
};

export const addPaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: ADD_PAYMENT_METHOD,
    payload: paymentMethod,
  });
};

export const checkout = (id, source, address) => (dispatch) => {
  axios
    .post(`/api/order/${id}`, { source, address })
    .then((res) =>
      dispatch({
        type: CHECKOUT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};

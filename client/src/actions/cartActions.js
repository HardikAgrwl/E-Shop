import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  ADD_TO_CART,
  CART_LOADING,
  CLEAR_CART,
  DELETE_FROM_CART,
  GET_CART,
  SAVE_CART,
  UPDATE_CART,
} from "./types";

export const getCart = (id) => (dispatch) => {
  dispatch(setCartLoading());
  axios
    .get(`/api/cart/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addToCart = (id, updatedCartItems, bill) => (dispatch) => {
  axios
    .post(`/api/cart/${id}`, { updatedCartItems, bill })
    .then((res) =>
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateCart = (cart) => (dispatch) => {
  dispatch({
    type: UPDATE_CART,
    payload: { ...cart },
  });
};

export const saveCart = (id, productId, quantity) => (dispatch) => {
  console.log("cartAction updatecart");
  axios
    .put(`/api/cart/${id}`, { productId, quantity })
    .then((res) =>
      dispatch({
        type: SAVE_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteFromCart = (userId, itemId) => (dispatch) => {
  axios
    .delete(`/api/cart/${userId}/${itemId}`)
    .then((res) =>
      dispatch({
        type: DELETE_FROM_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCartLoading = () => {
  return {
    type: CART_LOADING,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_ITEM,
  GET_ITEMS,
  ITEMS_LOADING,
  UPDATE_ITEM,
} from "./types";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/item")
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getSingleItem = (id) => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get(`/api/item/${id}`)
    .then((res) => {
      dispatch({
        type: GET_ITEM,
        payload: [res.data],
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch) => {
  axios
    .post("/api/item", item)
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`/api/item/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateItem = (id, item) => (dispatch) => {
  axios
    .put(`/api/item/${id}`, item)
    .then((res) =>
      dispatch({
        type: UPDATE_ITEM,
        payload: Promise.all([id, res.data]),
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

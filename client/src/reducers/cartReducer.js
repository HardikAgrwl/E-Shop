import {
  ADD_TO_CART,
  CART_LOADING,
  DELETE_FROM_CART,
  GET_CART,
} from "../actions/types";

const initialState = {
  cart: null,
  loading: false,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };

    case ADD_TO_CART:
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case CART_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}

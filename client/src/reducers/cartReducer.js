import {
  ADD_TO_CART,
  CART_LOADING,
  CLEAR_CART,
  DELETE_FROM_CART,
  GET_CART,
  SAVE_CART,
  UPDATE_CART,
} from "../actions/types";

const initialState = {
  cart: {},
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
    case UPDATE_CART:
    case SAVE_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case CART_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: {},
        loading: false,
      };

    default:
      return state;
  }
}

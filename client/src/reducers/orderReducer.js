import {
  ADD_ORDER,
  CHECKOUT,
  GET_ORDERS,
  ORDERS_LOADING,
} from "../actions/types";

const initialState = {
  currentOrder: {},
  orders: [],
  loading: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case ADD_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    case CHECKOUT:
      return {
        ...state,
        currentOrder: {},
        orders: [action.payload, ...state.orders],
      };

    case ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}

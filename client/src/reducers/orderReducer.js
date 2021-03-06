import {
  ADD_ORDER,
  ADD_PAYMENT_METHOD,
  CHECKOUT,
  GET_ORDERS,
  ORDERS_LOADING,
} from "../actions/types";

const initialState = {
  currentOrder: {},
  paymentMethod: "",
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
    case ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CHECKOUT:
      return {
        ...state,
        currentOrder: action.payload,
        paymentMethod: "",
        orders: [action.payload, ...state.orders],
        loading: false,
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

import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import errorReducer from "./errorReducer";
import itemReducer from "./itemReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
});

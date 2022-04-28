import { combineReducers } from "redux";
import orderReduers from "./orderReduers";
import userReducer from "./user";

export default combineReducers({
  user: userReducer,
  order: orderReduers,
});

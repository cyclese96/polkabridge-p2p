import { combineReducers } from "redux";
import orderReduers from "./orderReduers";

export default combineReducers({
  order: orderReduers,
});

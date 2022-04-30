import { combineReducers } from "redux";
import orderReduers from "./orderReduers";
import userReducer from "./user";
import multicall from "../state/multicall/reducer";

export default combineReducers({
  user: userReducer,
  order: orderReduers,
  multicall: multicall,
});

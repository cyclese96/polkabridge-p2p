import { combineReducers } from "redux";
import orderReduers from "./orderReduers";
import profileReducers from "./profileReducers";
import userReducer from "./user";
import multicall from "../state/multicall/reducer";

export default combineReducers({
  user: userReducer,
  order: orderReduers,
  profile: profileReducers,
  multicall: multicall,
});

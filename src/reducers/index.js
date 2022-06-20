import { combineReducers } from "redux";
import orderReduers from "./orderReduers";
import profileReducers from "./profileReducers";
import userReducer from "./userReducer";
import multicall from "../state/multicall/reducer";
import tradeReducer from "./tradeReducer";

export default combineReducers({
  user: userReducer,
  order: orderReduers,
  profile: profileReducers,
  multicall: multicall,
  userTrade: tradeReducer,
});

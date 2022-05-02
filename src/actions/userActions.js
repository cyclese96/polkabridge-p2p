import axios from "axios";
import { LOAD_USER } from "./types";
import constants from "../utils/constants";

let backend_url = constants.backend_url;
export const loadUser = (user, chainId) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER,
      payload: user,
    });
  } catch (error) {
    console.log("loadUser  ", error);
  }
};

export const requestChalleng = (address, chainId) => async (dispatch) => {
  try {
    const challenge = await axios.get(
      `${backend_url}/api/auth/v1/authChallenge/${address}`
    );
    console.log(challenge.data);
  } catch (error) {
    console.log("requestChallenge ", error);
  }
};

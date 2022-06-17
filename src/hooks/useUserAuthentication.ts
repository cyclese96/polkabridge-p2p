import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import { LOAD_USER } from "../actions/types";
import connectors from "../connections/connectors";
import { CONNECTOR_TYPE } from "../constants";
import { getUser } from "../utils/httpCalls";
import { AuthStatus } from "../utils/interface";
import useActiveWeb3React from "./useActiveWeb3React";

export function useUserAuthentication(): [
  AuthStatus,
  () => {},
  () => {},
  () => void
] {
  const { chainId, active, deactivate, activate, account } =
    useActiveWeb3React();
  const [authStatus, setAuthStatus] = useState<{
    authenticated: boolean;
    pending: Boolean;
  }>({ authenticated: false, pending: false });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const connectWallet = useCallback(
    async (connector?: string | null) => {
      try {
        if (connector === CONNECTOR_TYPE.injected) {
          activate(connectors.injected);
          localStorage.connector = connector;
        } else if (connector === CONNECTOR_TYPE.walletConnect) {
          activate(connectors.walletconnect);
          localStorage.connector = connector;
        } else {
          activate(connectors.injected);
          localStorage.connector = "injected";
        }
      } catch (error) {
        console.log("wallet connection error", { error });
      }
    },
    [activate]
  );

  const verifyUserWallet = useCallback(async () => {
    //:Note sign message is only working for metamast
    //:todo fix this for wallet connect as well
    setAuthStatus({ authenticated: false, pending: true });
    const web3 = new Web3(window.ethereum);
    let messageHash: string | null;
    let signature: string | null;
    try {
      const user = await getUser();

      if (user?.status === 200 && user?.data?.wallet_address === account) {
        setAuthStatus({ authenticated: true, pending: false });

        dispatch({
          type: LOAD_USER,
          payload: { jwtToken: localStorage.user, account },
        });

        return;
      }

      messageHash = web3.utils.sha3("Hello ethereum");

      if (!messageHash || !account) {
        return;
      }

      signature = await web3.eth.sign(messageHash, account);

      if (!signature) {
        return;
      }

      const verify = await axios.get(
        `http://localhost:5002/auth-apis/v1/signatureVerify/${messageHash}/${signature}/${account?.toLowerCase()}`
      );

      // console.log("verification resposne ", verify);
      // verify user wallet from server and authenticate
      if (verify?.data?.verified === true) {
        setAuthStatus({ authenticated: true, pending: false });
        dispatch({
          type: LOAD_USER,
          payload: { jwtToken: verify?.data?.jwtToken, account },
        });
        localStorage.user = verify?.data?.jwtToken;
      }
    } catch (error) {
      setAuthStatus({ authenticated: false, pending: false });
      console.log("signed message error ", error);
    }
  }, [account]);

  const logout = useCallback(() => {
    deactivate();
    localStorage.removeItem("user");
    setAuthStatus({ ...authStatus, authenticated: false });
  }, [setAuthStatus]);

  useEffect(() => {
    // console.log("running sign and verify ", { authStatus, active });

    if (active && !authState.authenticated) {
      verifyUserWallet();
    }

    if (!active && localStorage.connector) {
      console.log("reconnecting wallet with ", localStorage.connector);
      connectWallet(localStorage.connector);
      return;
    }

    // signAndVerify();
  }, [active]);

  const authState = useMemo(() => {
    return { authenticated: authStatus.authenticated, account };
  }, [authStatus]);

  return [authState, connectWallet, verifyUserWallet, logout];
}

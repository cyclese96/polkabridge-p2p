import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import connectors from "../connections/connectors";
import { CONNECTOR_TYPE } from "../constants";
import { getUser } from "../utils/httpCalls";
import { AuthStatus } from "../utils/interface";
import useActiveWeb3React from "./useActiveWeb3React";

export function useUserAuthentication(): [AuthStatus, () => {}, () => void] {
  const { chainId, deactivate, activate, account } = useActiveWeb3React();
  const [authenticated, setAuthenticated] = useState(false);

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

  const logout = useCallback(() => {
    deactivate();
    localStorage.removeItem("user");
    setAuthenticated(false);
  }, [setAuthenticated]);

  useEffect(() => {
    if (localStorage.connector) {
      connectWallet(localStorage.connector);
    }
  }, []);

  useEffect(() => {
    async function signAndVerify() {
      //:Note sign message is only working for metamast
      //:todo fix this for wallet connect as well
      setAuthenticated(false);
      const web3 = new Web3(window.ethereum);
      let messageHash: string | null;
      let signature: string | null;
      try {
        const user = await getUser();

        if (user && user?.wallet_address === account) {
          setAuthenticated(true);
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

        console.log("verification resposne ", verify);
        // verify user wallet from server and authenticate
        if (verify?.data?.verified === true) {
          setAuthenticated(true);
          localStorage.user = verify?.data?.jwtToken;
        }
      } catch (error) {
        console.log("signed message error ", error);
      }
    }

    if (!account) {
      return;
    }

    signAndVerify();
  }, [account, chainId]);

  const authStatus = useMemo(() => {
    return { authenticated, account };
  }, [authenticated]);

  return [authStatus, connectWallet, logout];
}

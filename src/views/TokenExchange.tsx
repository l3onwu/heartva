import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";
import localforage from "localforage";

const TokenExchange = () => {
  // State
  const { userHook } = useGlobalContext();

  // Functions
  const navigate = useNavigate();
  // @ts-ignore
  let params = new URL(document.location).searchParams;
  let code = params.get("code");

  let axiosRequestConfig = {
    method: "post",
    url: `https://www.strava.com/oauth/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=${code}`,
  };

  // On load, set userObject and redirect to dashboard
  useEffect(() => {
    const tokenRequest = async () => {
      try {
        const { data: userData } = await axios(axiosRequestConfig);
        userHook?.setUserObject(userData);
        // Also save to localforage
        localforage.setItem("userObject", userData);
      } catch (err) {
        console.log(err);
      }
    };
    tokenRequest();
    navigate("/");
  }, []);

  // TSX
  return (
    <>
      <Box>Signing in...</Box>
    </>
  );
};

export default TokenExchange;

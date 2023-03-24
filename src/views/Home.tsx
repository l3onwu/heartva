import { Flex } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";
import HeroPage from "./HeroPage";
import Dashboard from "./Dashboard";

const Home = () => {
  // Functions
  const { userHook } = useGlobalContext();

  // TSX
  return (
    <Flex width="100vw" height="100vh">
      {!userHook?.firstLoad && userHook?.userObject == null ? (
        <HeroPage />
      ) : (
        <Dashboard />
      )}
    </Flex>
  );
};

export default Home;

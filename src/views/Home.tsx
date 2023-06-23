import { Flex } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";
import HeroPage from "./HeroPage";
import Dashboard from "./Dashboard";
import HRGraphPage from "./HRGraphPage";

const Home = () => {
  // Functions
  const { userHook } = useGlobalContext();

  // TSX
  return (
    <Flex width="100%">
      {userHook?.userObject == null ? <HeroPage /> : <HRGraphPage />}
    </Flex>
  );
};

export default Home;

import { Flex } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";
import HeroPage from "./HeroPage";
import Dashboard from "./Dashboard";
import HRGraphPage from "./HRGraphPage";

const Home = () => {
  // Functions
  const { userHook } = useGlobalContext();
  console.log(userHook?.firstLoad);
  console.log(userHook?.userObject);

  // TSX
  return (
    <Flex width="100%" height="calc(100vh - 100px)">
      {userHook?.userObject == null ? <HeroPage /> : <HRGraphPage />}
    </Flex>
  );
};

export default Home;

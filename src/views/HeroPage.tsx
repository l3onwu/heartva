import { Stack, Heading, Link, Text, Box, Flex } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";

const HeroPage = () => {
  // State
  const { userHook } = useGlobalContext();

  // TSX
  return (
    <Flex width="100%" height="calc(100vh - 200px)" pt="100px" justify="center">
      <Flex direction="column" pt="20px" align="center">
        <Text className="logo-text" mb="10px">
          HEARTVA
        </Text>
        <Heading fontSize="48px" color="white" mb="50px" fontFamily="Gill Sans">
          ❤️ Heart data for Strava athletes
        </Heading>

        <Flex align={"center"}>
          <Link
            width="fit-content"
            bgColor="#FC5201"
            color="white"
            py="5px"
            px="10px"
            fontWeight="bold"
            borderRadius="5px"
            mr="10px"
            href={`https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_BASEURL}/token-exchange&scope=activity:read`}
          >
            Login with Strava
          </Link>
          <Link
            width="fit-content"
            bgColor="#FF355D"
            color="white"
            py="5px"
            px="10px"
            fontWeight="bold"
            borderRadius="5px"
            onClick={() => userHook?.setDemoMode(true)}
          >
            View demo
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeroPage;

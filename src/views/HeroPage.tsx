import { Stack, Heading, Link, Text, Box, Flex } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";

const HeroPage = () => {
  // State
  const { userHook } = useGlobalContext();

  // TSX
  return (
    <Flex width="100%" height="calc(100vh - 200px)" pt="100px" justify="center">
      <Flex direction="column" pt="20px" align="center">
        <Text className="logo-text" mb="20px">
          HEARTVA
        </Text>
        <Heading
          fontSize="50px"
          color="white"
          mb="65px"
          fontFamily="Helvetica"
          textAlign={"center"}
        >
          Heart data for Strava athletes
        </Heading>

        <Flex align={"center"} direction={"column"}>
          <Link
            width="fit-content"
            bgColor="#FF355D"
            color="white"
            py="5px"
            px="10px"
            mb="12px"
            fontWeight="bold"
            borderRadius="5px"
            onClick={() => userHook?.setDemoMode(true)}
            _hover={{backgroundColor: "#fa4c75"}}
          >
            View demo
          </Link>
          <Link
            width="fit-content"
            bgColor="transparent"
            fontSize="12px"
            color="#727272"
            py="5px"
            px="10px"
            fontWeight="bold"
            borderRadius="5px"
            href={`https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_BASEURL}/token-exchange&scope=activity:read`}
            _hover={{ color: "whitesmoke" }}
          >
            Or visualize your own workouts
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeroPage;

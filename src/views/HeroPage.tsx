import { Stack, Heading, Link, Text, Box, Flex } from "@chakra-ui/react";

const HeroPage = () => {
  return (
    <Flex
      width="100%"
      height="calc(100vh - 200px)"
      pt="100px"
      justify="center"
      // bgColor="red"
    >
      <Flex direction="column" pt="20px" align="center">
        <Text className="logo-text" mb="10px">
          HEARTVA
        </Text>
        <Heading fontSize="48px" color="white" mb="50px">
          ❤️ Heart data for Strava athletes
        </Heading>

        <Link
          width="fit-content"
          bgColor="#FF355D"
          color="white"
          py="5px"
          px="10px"
          fontWeight="bold"
          borderRadius="5px"
          // TODO May have to replace localhost with server name? window.location.origin.getString() could work...
          href={`https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/token-exchange&scope=activity:read`}
        >
          Request Strava
        </Link>
      </Flex>
    </Flex>
  );
};

export default HeroPage;

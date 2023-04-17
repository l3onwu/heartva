import { Stack, Heading, Link } from "@chakra-ui/react";

const HeroPage = () => {
  return (
    <>
      <Stack direction="column" p="20px">
        <Heading fontSize="24px" color="gray">
          Heartva | Heart data for Strava athletes
        </Heading>
        <Link
          width="fit-content"
          bgColor="#FC5201"
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
      </Stack>
    </>
  );
};

export default HeroPage;

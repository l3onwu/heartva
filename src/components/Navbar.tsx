import { Flex, Text, Stack } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex width="100%" height="60px" mb="10px" align="center">
      {/* Left */}
      <Flex direction="row" align="center">
        {/* Logo */}
        <Text className="logo-text" mr="50px">
          HEARTVA
        </Text>

        {/* Navbuttons */}
        <Stack
          direction="row"
          spacing="30px"
          align="center"
          color="#AC96B9"
          fontSize="14px"
          fontWeight="bold"
        >
          <Text>Activites</Text>
          <Text>Stats</Text>
          {/* <Text>Plan</Text> */}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Navbar;

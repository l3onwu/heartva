import { Flex, Box, Text } from "@chakra-ui/react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";

const HRGraphPage = () => {
  return (
    <Box width="100%">
      <Flex
        width="100%"
        justify="space-between"
        flexWrap="wrap"
        maxH="calc(100vh - 80px)"
      >
        {/* Right side */}
        <Box width="100%" height="300px" px="40px" mb="20px">
          {/* Page heading */}
          {/* <Text color="#9C88AA" fontWeight="bold" fontSize="30px" mb="30px">
            HR Graph
          </Text> */}
          <HRGraph />
        </Box>

        {/* Left side */}
        <Box
          height="calc(100vh - 380px)"
          width="100%"
          overflow="scroll"
          pb="20px"
          borderTop="0.5px solid #333333"
        >
          <ActivityList />
        </Box>
      </Flex>
    </Box>
  );
};

export default HRGraphPage;

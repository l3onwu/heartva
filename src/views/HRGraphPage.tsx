import { Flex, Box, Text } from "@chakra-ui/react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";

const HRGraphPage = () => {
  return (
    <Box width="100%">
      {/* Page heading */}
      <Text color="#9C88AA" fontWeight="bold" fontSize="40px" mb="30px">
        HR Graph
      </Text>
      <Flex width="100%" justify="space-between">
        <Box width="65%" height="calc(100vh - 200px)">
          <HRGraph />
        </Box>
        <Box width="30%" height="calc(100vh - 200px)" overflow="scroll">
          <ActivityList />
        </Box>
      </Flex>
    </Box>
  );
};

export default HRGraphPage;

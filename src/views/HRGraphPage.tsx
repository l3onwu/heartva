import { Flex, Box, Text } from "@chakra-ui/react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";

const HRGraphPage = () => {
  return (
    <Box width="100%">
      <Flex width="100%" justify="space-between">
        <Box
          width="50%"
          height="calc(100vh - 55px)"
          overflow="scroll"
          // borderLeft="0.5px solid #333333"
          mr="20px"
          pb="20px"
        >
          <ActivityList />
        </Box>

        <Box
          width="50%"
          height="calc(100vh - 80px)"
          //  pt="40px"
        >
          {/* Page heading */}
          {/* <Text color="#9C88AA" fontWeight="bold" fontSize="30px" mb="30px">
            HR Graph
          </Text> */}
          <HRGraph />
        </Box>
      </Flex>
    </Box>
  );
};

export default HRGraphPage;

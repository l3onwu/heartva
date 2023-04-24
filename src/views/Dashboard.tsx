import ActivityList from "../components/ActivityList";
import { Box, Text, Flex } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box width="100%">
      {/* Page heading */}
      {/* <Text
        color="#9C88AA"
        // fontFamily="Courier"
        fontWeight="bold"
        fontSize="30px"
        mb="30px"
      >
        Latest activites
      </Text> */}

      {/* Page contents */}
      <Flex direction="row" justify="space-between" pb="100px">
        {/* Left side */}
        <Box width="50%">
          <ActivityList />
        </Box>

        {/* Right sidebar */}
        <Box width="38%">
          <Box
            bgColor="#23142D"
            position="sticky"
            top="70px"
            height="500px"
            p="10px"
            borderRadius="7px"
          >
            <Text color="#9C88AA">Personal bests</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;

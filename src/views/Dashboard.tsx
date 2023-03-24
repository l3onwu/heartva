import Navbar from "../components/Navbar";
import ActivityList from "../components/ActivityList";
import { Box, Text, Flex } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box width="100%" height="100%" overflow="scroll" px="40px">
      {/* Navbar */}
      <Navbar />

      {/* Page heading */}
      <Text color="#9C88AA" fontWeight="bold" fontSize="40px" mb="30px">
        Latest activites
      </Text>

      {/* Page contents */}
      <Flex direction="row" justify="space-between" pb="100px">
        {/* Left side */}
        <Box width="63%">
          <ActivityList />
        </Box>

        {/* Right sidebar */}
        <Box width="32%">
          <Box
            bgColor="#23142D"
            position="sticky"
            top="30px"
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

import { Flex, Box, Button, Stack, Heading } from "@chakra-ui/react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";
import { useGlobalContext } from "../lib/context";

const HRGraphPage = () => {
  // State
  const { userHook } = useGlobalContext();

  // JSX
  return (
    <Box width="100%">
      <Flex direction="column" width="100%">
        {/* Filter bar */}
        <Flex
          align="baseline"
          direction="row"
          px="40px"
          pt="0px"
          pb="5px"
          mt="0px"
          mb="20px"
        >
          <Heading
            color="whitesmoke"
            mr="40px"
            fontSize="48px"
            fontFamily="Gill Sans"
          >
            HR Graph
          </Heading>

          {/* Filter bar controls */}
          <Stack direction="row">
            <Button
              bgColor="#ff355d"
              color="white"
              borderRadius="30px"
              size="xs"
              onClick={() => {
                userHook?.setActivitiesPage(userHook?.activitiesPage + 1);
              }}
            >
              Load more
            </Button>
            <Button size="xs" borderRadius="30px">
              Dates
            </Button>
            <Button size="xs" borderRadius="30px">
              HR
            </Button>
          </Stack>
        </Flex>

        {/* Main content */}
        <Flex
          width="100%"
          justify="space-between"
          borderTop="0.5px solid #333333"
          height="calc(100vh - 150px)"
        >
          {/* Left side */}
          <Box width="37%" overflow="scroll" mr="20px" pb="20px">
            <ActivityList />
          </Box>

          {/* Right side */}
          <Box width="63%" pr="40px" pt="40px">
            <HRGraph />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HRGraphPage;

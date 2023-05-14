import { Flex, Box, Button, Stack, Heading } from "@chakra-ui/react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";
import { useGlobalContext } from "../lib/context";
import { BsGraphUp } from "react-icons/bs";

const HRGraphPage = () => {
  // State
  const { userHook } = useGlobalContext();

  // JSX
  return (
    <Box width="100%">
      <Flex direction="column" width="100%">
        {/* Filter bar */}
        <Flex
          align="end"
          direction="row"
          px="40px"
          pt="10px"
          pb="5px"
          mb="20px"
        >
          <Heading
            color="whitesmoke"
            mr="30px"
            fontSize="34px"
            fontFamily="Ubuntu"
            fontWeight="500"
            display="flex"
            alignItems="center"
          >
            <span style={{ marginRight: "15px" }}>
              <BsGraphUp />
            </span>
            HR Graph
          </Heading>

          {/* Filter bar controls */}
          <Stack direction="row" spacing="0px">
            <Button
              color="gray"
              variant="unstyled"
              size="xs"
              onClick={() => {
                userHook?.setActivitiesPage(userHook?.activitiesPage + 1);
              }}
            >
              Load more
            </Button>
            {/* <Button
              variant="unstyled"
              size="xs"
              style={{
                border: "1px solid gray",
                borderRadius: "0px",
                borderRight: "1px solid transparent",
              }}
            >
              Dates
            </Button>
            <Button
              variant="unstyled"
              size="xs"
              style={{
                border: "1px solid gray",
                borderRadius: "0px",
                borderRight: "1px solid transparent",
              }}
            >
              HR
            </Button> */}
          </Stack>
        </Flex>

        {/* Main content */}
        <Flex
          direction={["column", "column", "column", "row"]}
          width="100%"
          justify="space-between"
          borderTop="0.5px solid #333333"
          height={["", "", "", "calc(100vh - 150px)"]}
        >
          {/* Left side */}
          <Box
            height={["300px", "300px", "300px", "calc(100vh - 150px)"]}
            minW={["100%", "100%", "100%", "40%"]}
            overflow="scroll"
            mr="20px"
            pb="20px"
          >
            <ActivityList />
          </Box>

          {/* Right side */}
          <Box
            height={["800px", "500px", "500px", "calc(100vh - 150px)"]}
            width={["100%", "100%", "100%", "60%"]}
            pr="40px"
            pl={["40px", "40px", "40px", "0px"]}
            pt="40px"
          >
            <HRGraph />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HRGraphPage;

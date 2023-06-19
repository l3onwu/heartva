import { Flex, Box, Text, Button, Stack, Select } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";
import { useGlobalContext } from "../lib/context";

const HRGraphPage = () => {
  const { userHook } = useGlobalContext();
  const [chartKey, setChartKey] = useState(0); // Force re-render of chart, for nice loading

  return (
    <Box width="100%">
      <Box
        // border={"0.5px solid #986C8D"} borderRadius={"5px"}
        mb="20px"
      >
        {/*Page heading */}
        <Flex justify="space-between" mb="10px">
          <Flex direction={"row"} align={"center"}>
            <Text
              fontSize="18px"
              color="white"
              fontWeight={"semibold"}
              padding={"0px"}
              mr={"7px"}
            >
              Trends for
            </Text>
            <Select
              size={"xs"}
              fontSize="14px"
              color="white"
              fontWeight={"semibold"}
              defaultValue={2023}
              width={"fit-content"}
              borderRadius={"5px"}
              padding={"0px"}
              borderColor={"#444444"}
              onChange={(e) => {
                userHook?.setStatsYear(parseInt(e.target.value));
                setChartKey(chartKey + 1);
              }}
            >
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2018}>2018</option>
            </Select>
          </Flex>

          {/*Filters*/}
          <Stack direction={"row"} spacing={2}>
            <Select
              size="xs"
              variant="outline"
              defaultValue="date"
              color={"#444444"}
              borderColor={"#444444"}
            >
              <option value="date">Date</option>
            </Select>
            <Select
              size="xs"
              variant="outline"
              defaultValue="distance"
              color={"#444444"}
              borderColor={"#444444"}
            >
              <option value="distance">Distance</option>
              <option value="speed">Speed</option>
              <option value="heartrate">Heartrate</option>
            </Select>
            <Select
              size="xs"
              variant="outline"
              defaultValue="-"
              color={"#444444"}
              borderColor={"#444444"}
            >
              <option value="-">-</option>
              <option value="distance">Distance</option>
              <option value="speed">Speed</option>
              <option value="heartrate">Heartrate</option>
            </Select>

            {/*<Button size={"xs"} variant={"outline"} colorScheme={"grey"}>Year</Button>*/}
          </Stack>
        </Flex>

        {/* HR Graph */}
        <Box
          height="220px"
          width={"100%"}
          mb={"00px"}
          // borderBottom={"0.5px solid #986C8D"}
          //  p={"10px"}
          // border={"0.5px solid #333333"} borderRadius={"5px"} padding={"8px"}
        >
          <HRGraph chartKey={chartKey} />
        </Box>
      </Box>

      <Text fontSize="18px" color="white" fontWeight={"semibold"} mb="10px">
        Activities
      </Text>

      {/* HR Table */}
      <Box
        height="calc(100vh - 400px)"
        width="100%"
        overflow="scroll"
        pb="20px"
        px="5px"
      >
        <ActivityList />
      </Box>
    </Box>
  );
};

export default HRGraphPage;

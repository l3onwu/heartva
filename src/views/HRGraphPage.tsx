import { Flex, Box, Text, Stack, Select } from "@chakra-ui/react";
import { useState } from "react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";
import { useGlobalContext } from "../lib/context";

export type AxesType = "pace" | "heartRate" | "distance";

const HRGraphPage = () => {
  const { userHook } = useGlobalContext();
  const [chartKey, setChartKey] = useState(0); // Force re-render of chart, for nice loading
  const [axesOne, setAxesOne] = useState<AxesType>("heartRate");
  const [axesTwo, setAxesTwo] = useState<AxesType>("pace");
  const [axesThree, setAxesThree] = useState<AxesType>("distance");

  return (
    <Box width="100%">
      <Box mb="20px">
        {/*Page heading */}
        <Flex justify="space-between" mb="10px">
          <Flex direction={"row"} align={"center"}>
            <Text
              fontSize="20px"
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
            {/*Axes one*/}
            <Select
              size="xs"
              variant="outline"
              defaultValue={axesOne}
              color={"#444444"}
              borderColor={"#444444"}
              onChange={(e) => {
                // @ts-ignore
                setAxesOne(e.target.value);
              }}
            >
              <option value="distance">Distance</option>
              <option value="pace">Pace</option>
              <option value="heartRate">Heartrate</option>
            </Select>

            {/*Axes two*/}
            <Select
              size="xs"
              variant="outline"
              defaultValue={axesTwo}
              color={"#444444"}
              borderColor={"#444444"}
              onChange={(e) => {
                // @ts-ignore
                setAxesTwo(e.target.value);
              }}
            >
              <option value="-">-</option>
              <option value="distance">Distance</option>
              <option value="pace">Pace</option>
              <option value="heartRate">Heartrate</option>
            </Select>

            {/*Axes three*/}
            <Select
              size="xs"
              variant="outline"
              defaultValue={axesThree}
              color={"#444444"}
              borderColor={"#444444"}
              onChange={(e) => {
                // @ts-ignore
                setAxesThree(e.target.value);
              }}
            >
              <option value="-">-</option>
              <option value="distance">Distance</option>
              <option value="pace">Pace</option>
              <option value="heartRate">Heartrate</option>
            </Select>
          </Stack>
        </Flex>

        {/* HR Graph */}
        <Box height="220px" width={"100%"} mb={"00px"}>
          <HRGraph
            chartKey={chartKey}
            axesOne={axesOne}
            axesTwo={axesTwo}
            axesThree={axesThree}
          />
        </Box>
      </Box>

      <Text fontSize="20px" color="white" fontWeight={"semibold"} mb="10px">
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

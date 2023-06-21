import { Flex, Text, Stack, Select, Box } from "@chakra-ui/react";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

const GraphHeader = ({
  chartKey,
  setChartKey,
  componentHeight,
  setComponentHeight,
  axesOne,
  axesTwo,
  axesThree,
  setAxesOne,
  setAxesTwo,
  setAxesThree,
  statsYear,
  setStatsYear,
}: {
  chartKey: number;
  setChartKey: any;
  componentHeight: number;
  setComponentHeight: any;
  axesOne: string;
  axesTwo: string;
  axesThree: string;
  statsYear: number;
  setAxesOne: any;
  setAxesTwo: any;
  setAxesThree: any;
  setStatsYear: any;
}) => {
  return (
    <Flex justify="space-between" mb="15px">
      {/*Header + year*/}
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
          value={statsYear}
          width={"fit-content"}
          borderRadius={"5px"}
          padding={"0px"}
          borderColor={"#444444"}
          mr={"10px"}
          onChange={(e) => {
            setStatsYear(parseInt(e.target.value));
            setChartKey(chartKey + 1);
          }}
        >
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
          <option value={2021}>2021</option>
          <option value={2020}>2020</option>
          <option value={2019}>2019</option>
          <option value={2018}>2018</option>
        </Select>

        {/*Maximize graph button*/}
        <Box
          aria-label="Settings"
          color={"gray"}
          width={"fit-content"}
          // bgColor={"#444444"}
          bgColor={componentHeight === 600 ? "#0c1733" : "transparent"}
          padding={"5px"}
          borderRadius={"5px"}
          onClick={() => {
            setComponentHeight(componentHeight === 600 ? 180 : 600);
          }}
          animation={"background-color 0.2s"}
          _hover={{ cursor: "pointer", bgColor: "#0c1733" }}
        >
          {componentHeight === 600 ? (
            <FiMinimize2 size={"18px"} />
          ) : (
            <FiMaximize2 size={"18px"} />
          )}
        </Box>
      </Flex>

      {/*Graph axes chooser*/}
      <Stack direction={"row"} spacing={2} align={"center"}>
        {/*Axes one*/}
        <Select
          size="xs"
          variant="outline"
          defaultValue={axesOne}
          color={"#444444"}
          borderColor={"#444444"}
          onChange={(e) => {
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
  );
};

export default GraphHeader;

import { Flex, Text, Stack, Select, Box, Checkbox } from "@chakra-ui/react";
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
          _hover={{ cursor: "pointer", borderColor: "white" }}
        >
          {/*TODO: Make this dynamically span to user's first activity year*/}
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
      <Stack direction={"row"} spacing={2} align={"center"} color={"gray"}>
        <Checkbox
          size="sm"
          colorScheme="gray"
          defaultChecked
          value={"Heartrate"}
          onChange={(e) => {
            if (axesOne === "heartRate") {
              setAxesOne(null);
            } else {
              setAxesOne("heartRate");
            }
          }}
        >
          Heartrate
        </Checkbox>
        <Checkbox
          size="sm"
          colorScheme="gray"
          defaultChecked
          onChange={(e) => {
            if (axesTwo === "pace") {
              setAxesTwo(null);
            } else {
              setAxesTwo("pace");
            }
          }}
        >
          Pace
        </Checkbox>
        <Checkbox
          size="sm"
          colorScheme="gray"
          onChange={(e) => {
            if (axesThree === "distance") {
              setAxesThree(null);
            } else {
              setAxesThree("distance");
            }
          }}
        >
          Distance
        </Checkbox>
      </Stack>
    </Flex>
  );
};

export default GraphHeader;

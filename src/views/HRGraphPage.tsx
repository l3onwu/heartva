import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";
import { useGlobalContext } from "../lib/context";
import ActivitiesHeader from "../components/ActivitiesHeader";
import GraphHeader from "../components/GraphHeader";
import { calculatePaceFromDistanceAndTime } from "../lib/helpers";

export type AxesType = "pace" | "heartRate" | "distance" | "-";
export interface FilterObjectType {
  id: number;
  type: string;
  data: any;
}

const HRGraphPage = () => {
  // General state
  const { userHook } = useGlobalContext();
  const [chartKey, setChartKey] = useState(0); // Force re-render of chart, for nice loading
  const [componentHeight, setComponentHeight] = useState(180);

  // Graph state
  const [axesOne, setAxesOne] = useState<AxesType>("heartRate");
  const [axesTwo, setAxesTwo] = useState<AxesType>("pace");
  const [axesThree, setAxesThree] = useState<AxesType>("-");

  // Filter data state
  const [statsYear, setStatsYear] = useState<number>(new Date().getFullYear());
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filterObjects, setFilterObjects] = useState<FilterObjectType[]>([]);
  // console.log(filterObjects);

  // Apply filters to activities
  // Begin by filtering by year
  let filteredActivities = userHook?.activities.filter((act) => {
    return new Date(act?.start_date_local).getFullYear() === statsYear;
  });
  // Loop over filters and apply specific filter functions
  for (let i = 0; i < filterObjects.length; i++) {
    if (filterObjects[i]?.type === "hrFilter") {
      filteredActivities = filteredActivities.filter((act) => {
        return (
          act?.average_heartrate >= filterObjects[i]?.data[0] * 2 &&
          act?.average_heartrate <= filterObjects[i]?.data[1] * 2
        );
      });
    } else if (filterObjects[i]?.type === "paceFilter") {
      filteredActivities = filteredActivities.filter((act) => {
        const secondsPace = calculatePaceFromDistanceAndTime(
          act?.distance,
          act?.moving_time
        );
        return (
          (secondsPace >= filterObjects[i]?.data[0] ||
            filterObjects[i]?.data[0] === null) &&
          (secondsPace <= filterObjects[i]?.data[1] ||
            filterObjects[i]?.data[1] === null)
        );
      });
    }
  }

  // TSX
  return (
    <Box width="100%">
      {/* Graph */}
      <Box mb="24px">
        {/* Graph header */}
        <GraphHeader
          chartKey={chartKey}
          setChartKey={setChartKey}
          componentHeight={componentHeight}
          setComponentHeight={setComponentHeight}
          axesOne={axesOne}
          axesTwo={axesTwo}
          axesThree={axesThree}
          setAxesOne={setAxesOne}
          setAxesTwo={setAxesTwo}
          setAxesThree={setAxesThree}
          statsYear={statsYear}
          setStatsYear={setStatsYear}
        />

        {/* HR Graph */}
        <Box
          style={{
            height: `${componentHeight}px`,
            transition: "height 150ms ease-in-out",
          }}
          width={"100%"}
          mb={"00px"}
        >
          <HRGraph
            chartKey={chartKey}
            axesOne={axesOne}
            axesTwo={axesTwo}
            axesThree={axesThree}
            filteredActivities={filteredActivities}
            statsYear={statsYear}
          />
        </Box>
      </Box>

      {/* Activities */}
      {/* Conditionally render on minimized graph */}
      {componentHeight === 180 && (
        <Box>
          {/*Activities Header*/}
          <ActivitiesHeader
            selectedFilter={selectedFilter}
            filterObjects={filterObjects}
            setFilterObjects={setFilterObjects}
            setSelectedFilter={setSelectedFilter}
          />

          {/* Activities List */}
          <Box
            height="calc(100vh - 370px)"
            width="100%"
            overflow="scroll"
            pb="20px"
            px="5px"
          >
            <ActivityList
              filteredActivities={filteredActivities}
              statsYear={statsYear}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HRGraphPage;

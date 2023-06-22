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

export interface MegaFilterType {
  id: number;
  pace: any;
  hr: any;
  distance: any;
  sport: string;
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
  const [megaFilter, setMegaFilter] = useState<MegaFilterType>({
    id: 0,
    pace: [null, null],
    hr: [null, null],
    distance: [null, null],
    sport: "Run",
  });

  // Apply filters to activities
  // Begin by filtering by year
  let filteredActivities = userHook?.activities.filter((act) => {
    return new Date(act?.start_date_local).getFullYear() === statsYear;
  });

  // Filter pace
  filteredActivities = filteredActivities.filter((act) => {
    const secondsPace = calculatePaceFromDistanceAndTime(
      act?.distance,
      act?.moving_time
    );
    return (
      (secondsPace >= megaFilter?.pace[0] || megaFilter?.pace[0] === null) &&
      (secondsPace <= megaFilter?.pace[1] || megaFilter?.pace[1] === null)
    );
  });

  // Filter hr
  filteredActivities = filteredActivities.filter((act) => {
    return (
      (act?.average_heartrate >= megaFilter?.hr[0] ||
        megaFilter?.hr[0] === null) &&
      (act?.average_heartrate <= megaFilter?.hr[1] ||
        megaFilter?.hr[1] === null)
    );
  });

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
            megaFilter={megaFilter}
            setMegaFilter={setMegaFilter}
          />

          {/* Activities List */}
          <Box
            className={"hide-scrollbars"}
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

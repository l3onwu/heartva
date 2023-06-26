import {
  Box,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  Progress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";
import { useGlobalContext } from "../lib/context";
import ActivitiesHeader from "../components/ActivitiesHeader";
import GraphHeader from "../components/GraphHeader";
import { calculatePaceFromDistanceAndTime } from "../lib/helpers";
import useInitialDownload, {
  DownloadHookType,
} from "../lib/useInitialDownload";

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

  // Initial download modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false);
  const downloadHook: DownloadHookType = useInitialDownload(
    userHook,
    setModalOpen
  );

  // Filter data state
  // const [statsYear, setStatsYear] = useState<number>(new Date().getFullYear());
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
    return (
      new Date(act?.start_date_local).getFullYear() === userHook?.statsYear
    );
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
      <Box mb="30px">
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
          statsYear={userHook?.statsYear}
          setStatsYear={userHook?.setStatsYear}
        />

        {/* HR Graph */}
        <Box
          style={{
            height: `${componentHeight}px`,
            transition: "height 150ms ease-in-out",
          }}
          width={"100%"}
          p={"20px"}
          border="1px solid #333333"
          borderRadius="10px"
          _hover={{ cursor: "pointer", borderColor: "#727272" }}
          onClick={() => {
            if (componentHeight === 180) {
              setComponentHeight(600);
            } else {
              setComponentHeight(180);
            }
          }}
        >
          <HRGraph
            chartKey={chartKey}
            axesOne={axesOne}
            axesTwo={axesTwo}
            axesThree={axesThree}
            filteredActivities={filteredActivities}
            statsYear={userHook?.statsYear}
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
            height="calc(100vh - 410px)"
            width="100%"
            overflow="scroll"
            pb="20px"
            px="20px"
            border="1px solid #333333"
            borderRadius="10px"
            _hover={{ cursor: "pointer", borderColor: "#727272" }}
          >
            <ActivityList
              filteredActivities={filteredActivities}
              statsYear={userHook?.statsYear}
            />
          </Box>
        </Box>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Downloading data</ModalHeader>
          {/*<ModalCloseButton />*/}
          <ModalBody>
            <Stack>
              <Stack mb={"20px"}>
                <Text>Downloading user info</Text>
                <Progress
                  hasStripe
                  value={downloadHook?.modalUserLoadProgress}
                />

                <Text>Downloading activities info</Text>
                <Progress
                  hasStripe
                  value={downloadHook?.modalActivityLoadProgress}
                />
              </Stack>
              <Button
                isLoading={downloadHook?.modalActivityLoadProgress !== 100}
                loadingText="Loading data"
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                {downloadHook?.modalActivityLoadProgress === 100
                  ? "Finish"
                  : "Finalizing"}
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            {/*<Button colorScheme='blue' mr={3} onClick={onClose}>*/}
            {/*  Close*/}
            {/*</Button>*/}
            {/*<Button variant='ghost'>Secondary Action</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HRGraphPage;

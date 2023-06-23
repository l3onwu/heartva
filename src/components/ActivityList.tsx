import { Box, Text, Spinner, Stack } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";
import { ActivityShortType } from "../lib/types";
import {
  calculatePaceFromDistanceAndTime,
  clipText,
  secondsToMinPace,
} from "../lib/helpers";

const ActivityList = ({
  filteredActivities,
  statsYear,
}: {
  filteredActivities: ActivityShortType[];
  statsYear: number;
}) => {
  const { userHook } = useGlobalContext();

  // TSX
  return (
    <>
      {userHook?.activitiesLoading ? (
        <Box pt={"20px"}>
          <Spinner color="pink" size="lg" />
        </Box>
      ) : (
        <Box>
          <ActivityBoxHeader />
          {filteredActivities
            ?.filter((activityObject) => {
              return (
                new Date(activityObject?.start_date_local).getFullYear() ===
                statsYear
              );
            })
            ?.map((activityObject: ActivityShortType) => {
              return (
                <ActivityBox
                  activityObject={activityObject}
                  key={activityObject?.id}
                />
              );
            })}
        </Box>
      )}

      {/* Load more button (for dev use) */}
      {/*<Button*/}
      {/*  color="gray"*/}
      {/*  variant="unstyled"*/}
      {/*  size="xs"*/}
      {/*  onClick={() => {*/}
      {/*    userHook?.setActivitiesPage(userHook?.activitiesPage + 1);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Load more*/}
      {/*</Button>*/}
    </>
  );
};

export default ActivityList;

const ActivityBox = ({
  activityObject,
}: {
  activityObject: ActivityShortType;
}) => {
  // TSX
  return (
    <Box
      py="8px"
      _hover={{ backgroundColor: "#171f30", cursor: "pointer" }}
      color="gray"
      fontSize="12px"
    >
      <Stack direction="row">
        {/* Activity date */}
        <Text width="100px" overflow="hidden" pr="5px">
          {new Date(activityObject?.start_date_local).toLocaleDateString()}
        </Text>

        {/* Activity title */}
        <Text width="170px" overflow="hidden" pr="5px">
          {clipText(activityObject?.name, 18)}
        </Text>

        {/* Pace */}

        <Text width="80px" pr="5px">
          {secondsToMinPace(
            calculatePaceFromDistanceAndTime(
              activityObject.distance,
              activityObject.moving_time
            )
          )}{" "}
          /km
        </Text>

        {/* Distance*/}

        <Text width="80px" pr="5px">
          {Math.round(activityObject?.distance / 10) / 100} km
        </Text>

        {/* Time */}

        <Text width="80px" pr="5px">
          {Math.round(activityObject?.moving_time / 6) / 10} min
        </Text>

        {/* Heart rate and suffer score */}

        <Text width="80px" pr="5px">
          {/* ❤️  */}
          {activityObject?.average_heartrate}
        </Text>

        {/* Suffer score */}
        <Text width="60px" pr={"5px"}>
          {activityObject?.suffer_score}
        </Text>

        {/* Elapsed time */}
        <Text width="80px">
          {Math.round(activityObject?.elapsed_time / 60)}min
        </Text>

        {/* Moving time */}
        <Text width="80px">
          {Math.round(activityObject?.moving_time / 60)}min
        </Text>

        {/* Gear */}
        <Text width="80px">{activityObject?.gear_id}</Text>

        {/* Sport type */}
        <Text width="60px">{activityObject?.sport_type}</Text>

        {/* Elevation */}
        <Text width="60px">{activityObject?.total_elevation_gain}m</Text>
      </Stack>
    </Box>
  );
};

const ActivityBoxHeader = ({}: {}) => {
  // TSX
  return (
    <Box
      key={"title"}
      py="10px"
      position="sticky"
      top="0px"
      color="gray"
      bgColor="#020a20"
      borderBottom="0.5px solid #333333"
      fontSize="12px"
      fontWeight="bold"
    >
      <Stack direction="row">
        {/* Activity date */}
        <Text width="100px" overflow="hidden" pr="5px">
          Date
        </Text>

        {/* Activity title */}

        <Text width="170px" overflow="hidden" pr="5px">
          Title
        </Text>

        {/* Pace */}

        <Text width="80px" pr="5px">
          Pace
        </Text>

        {/* Distance*/}

        <Text width="80px" pr="5px">
          Distance
        </Text>

        {/* Time */}

        <Text width="80px" pr="5px">
          Time
        </Text>

        {/* Heart rate and suffer score */}

        <Text width="80px" pr="5px">
          Avg HR
        </Text>

        {/* Suffer score */}
        <Text width="60px" pr="5px">
          Effort
        </Text>

        {/* Elapsed time */}
        <Text width="80px" pr="5px">
          Elapsed
        </Text>

        {/* Moving time */}
        <Text width="80px" pr="5px">
          Moving time
        </Text>

        {/* Gear */}
        <Text width="80px" pr="5px">
          Gear
        </Text>

        {/* Sport type */}
        <Text width="60px" pr="5px">
          Sport
        </Text>

        {/* Elevation */}
        <Text width="60px">Elevation</Text>
      </Stack>
    </Box>
  );
};

import { Box, Text, Button, Spinner, Stack } from "@chakra-ui/react";
import { useGlobalContext } from "../lib/context";
import { ActivityShortType } from "../lib/types";

const ActivityList = () => {
  const { userHook } = useGlobalContext();

  // TSX
  return (
    <>
      {userHook?.activitiesLoading ? (
        <Box pt="20px" pl="40px">
          <Spinner color="pink" size="lg" />
        </Box>
      ) : (
        <Box width="100%" borderRight="0.5px solid #333333">
          <ActivityBox2Header />
          {userHook?.activities?.map((activityObject: ActivityShortType) => {
            return (
              <ActivityBox2
                activityObject={activityObject}
                key={activityObject?.id}
              />
            );
          })}
          <Button
            colorScheme="blue"
            mt="20px"
            ml="40px"
            size="xs"
            onClick={() => {
              userHook?.setActivitiesPage(userHook?.activitiesPage + 1);
            }}
          >
            Load more
          </Button>
        </Box>
      )}
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
      key={activityObject?.id}
      px="10px"
      borderBottom="0.5px solid #333333"
      pt="10px"
      pb="20px"
      transition="background-color 100ms ease-in"
    >
      {/* Activity title */}
      <Text color="#9C88AA" fontWeight="bold" fontSize="16px" mb="5px">
        {activityObject?.name}{" "}
      </Text>

      {/* Distance, pace, time */}
      <Text
        color="gray"
        // fontWeight="bold"
        fontSize="14px"
        mb="5px"
      >
        {Math.round(activityObject?.distance / 10) / 100} km -{" "}
        {Math.round(
          (activityObject?.moving_time /
            (activityObject?.distance / 1000) /
            60) *
            100
        ) / 100}{" "}
        min/km - {Math.round(activityObject?.moving_time / 6) / 10} min
      </Text>

      {/* Heart rate and suffer score */}
      <Text color="gray" fontSize="14px">
        <span style={{ fontWeight: "normal" }}>
          ❤️ {activityObject?.average_heartrate}
        </span>{" "}
        -
        <span
          style={{
            padding: 3,
            // fontWeight: "bold",
            color: "gray",
          }}
        >
          {activityObject?.suffer_score}
        </span>
        RE
      </Text>
    </Box>
  );
};

const ActivityBox2 = ({
  activityObject,
}: {
  activityObject: ActivityShortType;
}) => {
  // Functions
  // TODO Refactor these to helper functions
  const clipText = (text: string, length: number): string => {
    // If text is longer, use ...
    let trailingDots = "";
    if (text.length > length) {
      trailingDots = "...";
    }
    return `${text.slice(0, length)}${trailingDots}`;
  };

  const calculatePaceFromDistanceAndTime = (
    distance: number,
    time: number
  ): number => {
    // Rounds to
    return time / (distance / 1000);
  };

  const secondsToMinPace = (secondsPace: number): string => {
    // Get full minutes
    const fullMin = Math.floor(secondsPace / 60);
    // Get remainder seconds, rounded to 2dp
    const remainingSeconds = Math.round(secondsPace % 60);
    // Add 0 if seconds is single digit
    let extraDigit = "";
    if (remainingSeconds < 10) extraDigit = "0";
    // Format numbers
    return `${fullMin}.${extraDigit}${remainingSeconds}`;
  };

  // TSX
  return (
    <Box
      pr="10px"
      py="8px"
      pl="40px"
      // borderBottom="0.5px solid #333333"
      _hover={{ backgroundColor: "#171f30", cursor: "pointer" }}
    >
      <Stack direction="row">
        {/* Activity title */}
        <Text
          width="170px"
          overflow="hidden"
          // color="#9C88AA"
          color="gray"
          fontWeight="bold"
          fontSize="14px"
          pr="5px"

          // borderRight="0.5px solid #333333"
        >
          {clipText(activityObject?.name, 18)}
        </Text>

        {/* Pace */}
        <Text
          width="80px"
          color="gray"
          fontSize="14px"
          // mb="5px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          {secondsToMinPace(
            calculatePaceFromDistanceAndTime(
              activityObject.distance,
              activityObject.moving_time
            )
          )}{" "}
          /km
        </Text>

        {/* Distance*/}
        <Text
          width="80px"
          color="gray"
          fontSize="14px"
          // mb="5px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          {Math.round(activityObject?.distance / 10) / 100} km
        </Text>

        {/* Time */}
        <Text
          width="80px"
          color="gray"
          fontSize="14px"
          // mb="5px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          {Math.round(activityObject?.moving_time / 6) / 10} min
        </Text>

        {/* Heart rate and suffer score */}
        <Text
          width="80px"
          color="gray"
          fontSize="14px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          {/* ❤️  */}
          {activityObject?.average_heartrate}
        </Text>

        {/* Suffer score */}
        <Text
          width="60px"
          color="gray"
          fontSize="14px"
          // pr="5px"
          // borderRight="0.5px solid #333333"
        >
          {activityObject?.suffer_score}
        </Text>
      </Stack>
    </Box>
  );
};

const ActivityBox2Header = ({}: {}) => {
  // TSX
  return (
    <Box
      key={"title"}
      pr="10px"
      pl="40px"
      py="8px"
      position="sticky"
      top="0px"
      color="#9C88AA"
      bgColor="#020a20"
      // bgColor="#0d162b"
      borderBottom="0.5px solid #333333"
      // boxShadow="0px 1px 3px #333333"
    >
      <Stack direction="row">
        {/* Activity title */}
        <Text
          width="170px"
          overflow="hidden"
          fontWeight="bold"
          fontSize="14px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          Title
        </Text>

        {/* Pace */}
        <Text
          width="80px"
          fontWeight="bold"
          fontSize="14px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          Pace
        </Text>

        {/* Distance*/}
        <Text
          width="80px"
          fontWeight="bold"
          fontSize="14px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          Distance
        </Text>

        {/* Time */}
        <Text
          width="80px"
          fontWeight="bold"
          fontSize="14px"
          // mb="5px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          Time
        </Text>

        {/* Heart rate and suffer score */}
        <Text
          width="80px"
          fontWeight="bold"
          fontSize="14px"
          pr="5px"
          // borderRight="0.5px solid #333333"
        >
          Avg HR
        </Text>

        {/* Suffer score */}
        <Text width="60px" fontWeight="bold" fontSize="14px">
          Effort
        </Text>
      </Stack>
    </Box>
  );
};

import { Box, Text, Button, Spinner } from "@chakra-ui/react";
import { BarLoader, BeatLoader, SyncLoader } from "react-spinners";
import { useGlobalContext } from "../lib/context";
import { ActivityShortType } from "../lib/types";

const ActivityList = () => {
  const { userHook } = useGlobalContext();

  // TSX
  return (
    <>
      {userHook?.activitiesLoading ? (
        <Spinner color="pink" size="lg" />
      ) : (
        <Box width="90%">
          {userHook?.activities?.map((activityObject: ActivityShortType) => {
            return <ActivityBox activityObject={activityObject} />;
          })}
          <Button
            colorScheme="white"
            size="sm"
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
      // py="7px"
      px="10px"
      // border="0.5px solid gray"
      // border="0.5px solid #9C88AA"
      // borderTop="0.5px solid #9C88AA"
      borderBottom="0.5px solid #333333"
      // borderRadius="5px"
      pt="10px"
      pb="20px"
      // mb="20px"
      // pb="15px"
      // bgColor="#23142D"
      transition="background-color 100ms ease-in"
      // _hover={{ backgroundColor: "#39142D", cursor: "pointer" }}
      // _hover={{ borderColor: "gray", cursor: "pointer" }}
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

import { Flex, Text, Button, Stack, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import { useGlobalContext } from "../lib/context";
import { BiRun, BiMedal } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";

const Navbar = () => {
  // State
  const navigate = useNavigate();
  const { userHook } = useGlobalContext();

  // Functions
  const signOutStrava = () => {
    localforage.setItem("userObject", null);
    userHook?.setUserObject(null);
    userHook?.setActivities([]);
  };

  // TSX
  return (
    <Flex
      width="100%"
      height="70px"
      align="center"
      marginBottom="6px"
      justify="space-between"
    >
      {/* Left side */}
      <Flex direction="row" align="center">
        {/* Logo */}
        <Text
          className="logo-text"
          mr="30px"
          onClick={() => {
            navigate("/");
          }}
          _hover={{ cursor: "pointer" }}
        >
          HEARTVA
        </Text>
      </Flex>

      {/* Right side */}
      {userHook?.demoMode ? (
        <Stack direction="row" align="center" justify={"baseline"}>
          <Stack direction="row" align="center" justify={"baseline"}>
            <Text color="white" fontSize="12px" fontWeight="600">
              Demo Mode
            </Text>
            <Text color="white" fontSize="12px" fontWeight="400">
              | Athlete: Leon Wu
            </Text>
          </Stack>
          <Button
            color="grey"
            size="sm"
            style={{ backgroundColor: "transparent", fontWeight: "500" }}
            _hover={{ color: "white" }}
            onClick={() => {
              userHook?.setDemoMode(false);
            }}
          >
            Back home
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" align="center" justify={"baseline"}>
          {/*Name and profile*/}
          <Stack
            direction={"row"}
            align="center"
            spacing={"5px"}
            border={"1px solid #333333"}
            borderRadius={"5px"}
            py={"5px"}
            px={"10px"}
            _hover={{ cursor: "pointer", borderColor: "#727272" }}
          >
            <Box mr={"10px"}>
              <img
                src={userHook?.userObject?.athlete?.profile}
                alt="Profile"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </Box>
            <Text color="white" fontSize="12px" fontWeight="600">
              {userHook?.userObject?.athlete?.firstname}{" "}
              {userHook?.userObject?.athlete?.lastname}
            </Text>
          </Stack>

          <Button
            color="grey"
            size="sm"
            style={{ backgroundColor: "transparent", fontWeight: "500" }}
            _hover={{ color: "white" }}
            onClick={() => {
              signOutStrava();
            }}
          >
            Sign out
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default Navbar;

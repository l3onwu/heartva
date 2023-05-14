import {
  Flex,
  Text,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
    userHook?.setActivitiesPage(1);
  };

  // TSX
  return (
    <Flex
      width="100%"
      height="50px"
      zIndex="10"
      align="center"
      bgColor="#020a20"
      px="40px"
      position="fixed"
      borderBottom="0.5px solid #333333"
      justify="space-between"
    >
      {/* Left side */}
      <Flex direction="row" align="center">
        {/* Logo */}
        <Text
          className="logo-text"
          mr="35px"
          onClick={() => {
            navigate("/");
          }}
          _hover={{ cursor: "pointer" }}
        >
          HEARTVA
        </Text>

        {/* Navmenu Container */}
        <Stack
          direction="row"
          // spacing="-10px"
          align="center"
          color="#AC96B9"
          fontSize="14px"
        >
          {/* Navmenu Buttons */}
          {/* <Button
            variant={"unstyled"}
            style={{
              fontSize: "14px",
              border: "1px solid #222222",
              padding: "-10px 20px",
            }}
          >
            Graph
          </Button> */}
          <button className="navButtonCool">
            <span style={{ fontSize: "20px", marginRight: "5px" }}>
              <BiRun />
            </span>
            Activities
          </button>
          <button className="navButtonCoolSelected">
            <span style={{ fontSize: "20px", marginRight: "5px" }}>
              <BsGraphUp />
            </span>
            Graph
          </button>
          <button className="navButtonCool">
            <span style={{ fontSize: "20px", marginRight: "5px" }}>
              <BiMedal />
            </span>
            Goals
          </button>

          {/* Activities menu */}
          {/* <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              fontSize="14px"
              fontWeight="bold"
              size="xs"
              // colorScheme="facebook"
              style={{ backgroundColor: "transparent" }}
              // border="1px solid #9C88AA"
            >
              Activites
            </MenuButton>
            <MenuList bgColor="#020a20" borderColor="gray">
              <MenuItem
                bgColor="#020a20"
                _hover={{ backgroundColor: "#39142D" }}
              >
                The Database
              </MenuItem>
              <MenuItem
                bgColor="#020a20"
                _hover={{ backgroundColor: "#39142D" }}
              >
                Map
              </MenuItem>
            </MenuList>
          </Menu> */}

          {/* Data menu */}
          {/* <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              fontSize="14px"
              fontWeight="bold"
              size="xs"
              // border="1px solid #9C88AA"
              style={{ backgroundColor: "transparent" }}
            >
              Data
            </MenuButton>
            <MenuList bgColor="#020a20" borderColor="gray">
              <MenuItem
                bgColor="#020a20"
                _hover={{ backgroundColor: "#39142D" }}
                onClick={() => {
                  navigate("/hrgraph");
                }}
              >
                HR Graph
              </MenuItem>
            </MenuList>
          </Menu> */}
        </Stack>
      </Flex>

      {/* Right side */}
      <Flex align="center">
        {/* <Text color="#666666" fontSize="12px" fontWeight="regular" mb="-10px">
          {userHook?.userObject?.athlete?.firstname}{" "}
          {userHook?.userObject?.athlete?.lastname}
        </Text> */}
        <Button
          color="gray"
          size="sm"
          fontFamily="Ubuntu"
          fontWeight="500"
          style={{ backgroundColor: "transparent" }}
          _hover={{ color: "white" }}
          onClick={() => {
            signOutStrava();
          }}
        >
          Sign out
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;

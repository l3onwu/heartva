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

const Navbar = () => {
  // State
  const navigate = useNavigate();

  // TSX
  return (
    <Flex width="100%" height="60px" mb="10px" align="center">
      {/* Left */}
      <Flex direction="row" align="center">
        {/* Logo */}
        <Text
          className="logo-text"
          mr="50px"
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
          spacing="-10px"
          align="center"
          color="#AC96B9"
          fontSize="14px"
        >
          {/* Navmenu Buttons */}
          {/* Activities menu */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              fontSize="14px"
              fontWeight="regular"
              style={{ backgroundColor: "transparent" }}
            >
              Activites
            </MenuButton>
            <MenuList bgColor="black" borderColor="gray">
              <MenuItem bgColor="black" _hover={{ backgroundColor: "#39142D" }}>
                The Database
              </MenuItem>
              <MenuItem bgColor="black" _hover={{ backgroundColor: "#39142D" }}>
                Map
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Data menu */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              fontSize="14px"
              fontWeight="regular"
              style={{ backgroundColor: "transparent" }}
            >
              Data
            </MenuButton>
            <MenuList bgColor="black" borderColor="gray">
              <MenuItem
                bgColor="black"
                _hover={{ backgroundColor: "#39142D" }}
                onClick={() => {
                  navigate("/hrgraph");
                }}
              >
                HR Graph
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Navbar;

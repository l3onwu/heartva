import {
    Flex,
    Text,
    Button,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import localforage from "localforage";
import {useGlobalContext} from "../lib/context";

const Navbar = () => {
    // State
    const navigate = useNavigate();
    const {userHook} = useGlobalContext();

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
            align="center"
            marginBottom="10px"
            justify="space-between"
        >
            {/* Left side */}
            <Flex direction="row" align="center">
                {/* Logo */}
                <Text
                    className="logo-text"
                    mr="50px"
                    onClick={() => {
                        navigate("/");
                    }}
                    _hover={{cursor: "pointer"}}
                >
                    HEARTVA
                </Text>
            </Flex>

            {/* Right side */}
            <Flex direction="row" align="center">
                <Text color="#666666" fontSize="12px" fontWeight="regular" mb="-10px">
                    {userHook?.userObject?.athlete?.firstname}{" "}
                    {userHook?.userObject?.athlete?.lastname}
                </Text>
                <Button
                    color="#AC96B9"
                    size="xs"
                    style={{backgroundColor: "transparent"}}
                    _hover={{color: "white"}}
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

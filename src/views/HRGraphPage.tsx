import {Flex, Box, Text} from "@chakra-ui/react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";

const HRGraphPage = () => {
    return (
        <Box width="100%">
            {/*Page heading */}
            <Text fontSize="18px" color="#986C8D" mb={"10px"} fontWeight={"semibold"}>Trends for 2023</Text>

            {/* HR Graph */}
            <Box height="250px" mb={"30px"}
                 // border={"0.5px solid #333333"} borderRadius={"5px"} padding={"8px"}
            >
                <HRGraph/>
            </Box>

            {/*HR Text*/}
            <Text fontSize="18px" color="#986C8D" mb={"10px"} fontWeight={"semibold"}>Activities</Text>

            {/* HR Table */}
            <Box
                height="calc(100vh - 450px)"
                width="100%"
                overflow="scroll"
                pb="20px"
            >
                <ActivityList/>
            </Box>
        </Box>
    );
};

export default HRGraphPage;

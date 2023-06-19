import {Flex, Box, Text, Button} from "@chakra-ui/react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";

const HRGraphPage = () => {
    return (
        <Box width="100%">

            <Box
                border={"0.5px solid #333333"} borderRadius={"5px"}
            >
                {/*Page heading */}
                <Flex p={"10px"}
                      justify="space-between"
                >
                    <Text fontSize="18px" color="#986C8D" fontWeight={"semibold"}>Trends for 2023</Text>
                    <Button size={"xs"} variant={"outline"} colorScheme={"grey"} >Year</Button>
                </Flex>

                {/* HR Graph */}
                <Box height="250px" width={"100%"}
                     mb={"00px"}
                     borderBottom={"0.5px solid #333333"}
                     p={"10px"}
                    // border={"0.5px solid #333333"} borderRadius={"5px"} padding={"8px"}
                >
                    <HRGraph/>
                </Box>

                {/* HR Table */}
                <Box
                    height="calc(100vh - 400px)"
                    width="100%"
                    overflow="scroll"
                    pb="20px"
                    px="10px"
                >
                    <ActivityList/>
                </Box>
            </Box>
        </Box>
    );
};

export default HRGraphPage;

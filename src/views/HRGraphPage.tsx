import {Flex, Box, Text, Button, Stack, Select} from "@chakra-ui/react";
import ActivityList from "../components/ActivityList";
import HRGraph from "../components/HRGraph";

const HRGraphPage = () => {
    return (
        <Box width="100%">

            <Box
                // border={"0.5px solid #986C8D"} borderRadius={"5px"}
                mb="20px"
            >
                {/*Page heading */}
                <Flex
                    justify="space-between"
                    mb="10px"
                >
                    <Text fontSize="18px" color="white" fontWeight={"semibold"}>Trends for 2023</Text>

                    {/*Filters*/}
                    <Stack direction={"row"} spacing={2}>
                        <Select size="xs" variant='outline' defaultValue='date' color={"#444444"}
                                borderColor={"#444444"}>
                            <option value='date'>Date</option>
                        </Select>
                        <Select size="xs" variant='outline' defaultValue='distance' color={"#444444"}
                                borderColor={"#444444"}>
                            <option value='distance'>Distance</option>
                            <option value='speed'>Speed</option>
                            <option value='heartrate'>Heartrate</option>
                        </Select>
                        <Select size="xs" variant='outline' defaultValue='-' color={"#444444"} borderColor={"#444444"}>
                            <option value='-'>-</option>
                            <option value='distance'>Distance</option>
                            <option value='speed'>Speed</option>
                            <option value='heartrate'>Heartrate</option>
                        </Select>

                        {/*<Button size={"xs"} variant={"outline"} colorScheme={"grey"}>Year</Button>*/}
                    </Stack>
                </Flex>


                {/* HR Graph */}
                <Box height="220px" width={"100%"}
                     mb={"00px"}
                    // borderBottom={"0.5px solid #986C8D"}
                    //  p={"10px"}
                    // border={"0.5px solid #333333"} borderRadius={"5px"} padding={"8px"}
                >
                    <HRGraph/>
                </Box>
            </Box>


            <Text fontSize="18px" color="white" fontWeight={"semibold"} mb="10px"
            >Activities</Text>

            {/* HR Table */}
            <Box
                height="calc(100vh - 400px)"
                width="100%"
                overflow="scroll"
                pb="20px"
                px="5px"
            >

                <ActivityList/>
            </Box>
        </Box>
    );
};

export default HRGraphPage;

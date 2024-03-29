import { FilterObjectType, MegaFilterType } from "../views/HRGraphPage";
import {
  Stack,
  Text,
  Flex,
  PopoverBody,
  PopoverContent,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  Input,
  Box,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { IoMdOptions } from "react-icons/io";

const ActivitiesHeader = ({
  megaFilter,
  setMegaFilter,
  numberActivities,
}: {
  megaFilter: MegaFilterType;
  setMegaFilter: any;
  numberActivities: number;
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  // TSX
  return (
    <Flex
      direction={"row"}
      justify={"space-between"}
      mb={"6px"}
      align={"center"}
      width={"100%"}
      overflow={"scroll"}
      className={"hide-scrollbars"}
    >
      {/*Activities heading*/}
      <Text
        fontSize="20px"
        color="white"
        fontWeight={"semibold"}
        mb="10px"
        mr={"10px"}
      >
        Activities ({numberActivities})
      </Text>

      {/*Filter popover*/}
      <Popover
        placement={"bottom-end"}
        isOpen={isOpen}
        onClose={onClose}
        returnFocusOnClose={false}
      >
        {/*Button*/}
        <PopoverTrigger>
          <Button
            size={"sm"}
            aria-label="Settings"
            color={"gray"}
            width={"fit-content"}
            onClick={onToggle}
            bgColor={isOpen ? "#0c1733" : "transparent"}
            padding={"4px"}
            borderRadius={"5px"}
            animation={"background-color 0.2s"}
            _hover={{ cursor: "pointer", bgColor: "#0c1733" }}
            position={"relative"}
          >
            <IoMdOptions size={"18px"} />
          </Button>
        </PopoverTrigger>

        {/*Contents*/}
        <PopoverContent borderRadius={"5px"} pb={"15px"}>
          <PopoverArrow />
          <PopoverBody>
            <Stack direction={"column"} spacing={"14px"}>
              {/*HR filter*/}
              <Stack direction={"column"}>
                {/*Top text*/}
                <Text fontSize={"14px"} fontWeight={"600"}>
                  HR filter (bpm)
                </Text>

                {/*Min/Max*/}
                <Stack direction={"row"}>
                  <Stack direction={"row"}>
                    <Text fontSize={"12px"}>Min</Text>
                    <Input
                      size={"xs"}
                      value={megaFilter?.hr[0] || ""}
                      onChange={(e) => {
                        setMegaFilter({
                          ...megaFilter,
                          hr: [
                            parseInt(e.target.value) || null,
                            megaFilter?.hr[1],
                          ],
                        });
                      }}
                    />
                  </Stack>
                  <Stack direction={"row"}>
                    <Text fontSize={"12px"}>Max</Text>
                    <Input
                      size={"xs"}
                      value={megaFilter?.hr[1] || ""}
                      onChange={(e) => {
                        setMegaFilter({
                          ...megaFilter,
                          hr: [
                            megaFilter?.hr[0],
                            parseInt(e.target.value) || null,
                          ],
                        });
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>

              {/*Pace filter*/}
              {/*Top text*/}
              <Stack direction={"column"}>
                <Text fontSize={"14px"} fontWeight={"600"}>
                  Pace filter (seconds/km)
                </Text>

                {/*Min/Max*/}
                <Stack direction={"row"}>
                  <Stack direction={"row"}>
                    <Text fontSize={"12px"}>Min</Text>
                    <Input
                      size={"xs"}
                      value={megaFilter?.pace[0] || ""}
                      onChange={(e) => {
                        setMegaFilter({
                          ...megaFilter,
                          pace: [
                            parseInt(e.target.value) || null,
                            megaFilter?.pace[1],
                          ],
                        });
                      }}
                    />
                  </Stack>
                  <Stack direction={"row"}>
                    <Text fontSize={"12px"}>Max</Text>
                    <Input
                      size={"xs"}
                      value={megaFilter?.pace[1] || ""}
                      onChange={(e) => {
                        setMegaFilter({
                          ...megaFilter,
                          pace: [
                            megaFilter?.pace[0],
                            parseInt(e.target.value) || null,
                          ],
                        });
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>

              {/*Distance filter*/}
              <Stack direction={"column"}>
                {/*Top text*/}
                <Text fontSize={"14px"} fontWeight={"600"}>
                  Distance filter (km)
                </Text>

                {/*Min/Max*/}
                <Stack direction={"row"}>
                  <Stack direction={"row"}>
                    <Text fontSize={"12px"}>Min</Text>
                    <Input
                      size={"xs"}
                      value={megaFilter?.distance[0] || ""}
                      onChange={(e) => {
                        setMegaFilter({
                          ...megaFilter,
                          distance: [
                            parseInt(e.target.value) || null,
                            megaFilter?.distance[1],
                          ],
                        });
                      }}
                    />
                  </Stack>
                  <Stack direction={"row"}>
                    <Text fontSize={"12px"}>Max</Text>
                    <Input
                      size={"xs"}
                      value={megaFilter?.distance[1] || ""}
                      onChange={(e) => {
                        setMegaFilter({
                          ...megaFilter,
                          distance: [
                            megaFilter?.distance[0],
                            parseInt(e.target.value) || null,
                          ],
                        });
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ActivitiesHeader;

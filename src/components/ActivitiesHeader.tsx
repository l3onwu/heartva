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
}: {
  megaFilter: MegaFilterType;
  setMegaFilter: any;
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
        Activities
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

        {/*Content*/}
        <PopoverContent
          width={"250px"}
          height={"250px"}
          overflow={"scroll"}
          borderRadius={"5px"}
        >
          <PopoverArrow />
          <PopoverBody>
            <Stack direction={"column"}>
              {/*Top text*/}
              <Text fontSize={"14px"} fontWeight={"600"}>
                HR options (bpm)
              </Text>

              {/*HR*/}
              <Stack direction={"row"}>
                <Text fontSize={"12px"}>Min</Text>
                <Input
                  size={"sm"}
                  value={megaFilter?.hr[0] || ""}
                  onChange={(e) => {
                    setMegaFilter({
                      ...megaFilter,
                      hr: [parseInt(e.target.value) || null, megaFilter?.hr[1]],
                    });
                  }}
                />
              </Stack>
              <Stack direction={"row"}>
                <Text fontSize={"12px"}>Max</Text>
                <Input
                  size={"sm"}
                  value={megaFilter?.hr[1] || ""}
                  onChange={(e) => {
                    setMegaFilter({
                      ...megaFilter,
                      hr: [megaFilter?.hr[0], parseInt(e.target.value) || null],
                    });
                  }}
                />
              </Stack>

              {/*HR*/}
              {/*Top text*/}
              <Text fontSize={"14px"} fontWeight={"600"}>
                Pace options (seconds/km)
              </Text>

              {/*Min/Max*/}
              <Stack direction={"row"}>
                <Text fontSize={"12px"}>Min</Text>
                <Input
                  size={"sm"}
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
                  size={"sm"}
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
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ActivitiesHeader;

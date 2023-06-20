import {
  Text,
  Stack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSlider,
  Input,
} from "@chakra-ui/react";

export const filterButtonFactory = ({
  filterObject,
  filterObjects,
  setFilterObjects,
}: {
  filterObject: any;
  filterObjects: any;
  setFilterObjects: any;
}) => {
  if (filterObject.type === "hrFilter") {
    return (
      <FilterButtonHR
        filterObject={filterObject}
        filterObjects={filterObjects}
        setFilterObjects={setFilterObjects}
        // TODO Replace with proper UID generator
        // key={Math.random() * 100}
      />
    );
  } else if (filterObject.type === "distanceFilter") {
    return;
  } else if (filterObject.type === "dateFilter") {
    return;
  } else if (filterObject.type === "paceFilter") {
    return (
      <FilterButtonPace
        filterObject={filterObject}
        filterObjects={filterObjects}
        setFilterObjects={setFilterObjects}
        // TODO Replace with proper UID generator
        // key={Math.random() * 100}
      />
    );
  }
};

const FilterButtonHR = ({
  filterObject,
  filterObjects,
  setFilterObjects,
}: {
  filterObject: any;
  filterObjects: any;
  setFilterObjects: any;
}) => {
  return (
    <Popover placement={"bottom-start"}>
      {/*Button*/}
      <PopoverTrigger>
        <Button
          size={"xs"}
          bgColor={"gray.700"}
          color={"white"}
          fontWeight={"regular"}
        >
          {"HR"}
        </Button>
      </PopoverTrigger>

      {/*Content*/}
      <PopoverContent width={"200px"} height={"130px"} overflow={"scroll"}>
        <PopoverArrow />
        <PopoverBody>
          <Stack direction={"column"}>
            {/*Top text*/}
            <Text fontSize={"11px"}>HR options</Text>

            {/*Slider*/}
            <Stack direction={"row"}>
              <Text fontSize={"11px"}>{filterObject.data[0] * 2}</Text>
              <RangeSlider
                width={["50px", "50px", "100px", "100px", "100px"]}
                aria-label={["min", "max"]}
                colorScheme="pink"
                defaultValue={filterObject.data}
                onChangeEnd={(value) => {
                  // Search for the filter object and update it
                  const newFilterObjects = filterObjects.filter((fil: any) => {
                    return fil.id !== filterObject.id;
                  });
                  setFilterObjects(
                    [
                      ...newFilterObjects,
                      { ...filterObject, data: value },
                    ].sort((a, b) => a.id - b.id)
                  );
                }}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Text fontSize={"11px"}>{filterObject.data[1] * 2}</Text>
            </Stack>

            {/*Delete filter*/}
            <Button
              size={"xs"}
              onClick={() => {
                // Delete self from filter objects
                const newFilterObjects = filterObjects.filter((filObj: any) => {
                  return filObj.id !== filterObject.id;
                });
                setFilterObjects(newFilterObjects);
              }}
            >
              Delete
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const FilterButtonPace = ({
  filterObject,
  filterObjects,
  setFilterObjects,
}: {
  filterObject: any;
  filterObjects: any;
  setFilterObjects: any;
}) => {
  return (
    <Popover placement={"bottom-start"}>
      {/*Button*/}
      <PopoverTrigger>
        <Button
          size={"xs"}
          bgColor={"gray.700"}
          color={"white"}
          fontWeight={"regular"}
        >
          Pace
        </Button>
      </PopoverTrigger>

      {/*Content*/}
      <PopoverContent width={"250px"} height={"150px"} overflow={"scroll"}>
        <PopoverArrow />
        <PopoverBody>
          <Stack direction={"column"}>
            {/*Top text*/}
            <Text fontSize={"11px"}>Pace options (seconds/km)</Text>

            {/*Min/Max*/}
            <Stack direction={"row"}>
              <Text fontSize={"12px"}>Min</Text>
              <Input
                size={"sm"}
                value={filterObject?.data[0]}
                onChange={(e) => {
                  // Search for the filter object and update it
                  const newFilterObjects = filterObjects.filter((fil: any) => {
                    return fil.id !== filterObject.id;
                  });
                  setFilterObjects(
                    [
                      ...newFilterObjects,
                      {
                        ...filterObject,
                        data: [
                          e.target.value,
                          parseInt(filterObject?.data[1]) || null,
                        ],
                      },
                    ].sort((a, b) => a.id - b.id)
                  );
                }}
              />
            </Stack>
            <Stack direction={"row"}>
              <Text fontSize={"12px"}>Max</Text>
              <Input
                size={"sm"}
                value={filterObject?.data[1]}
                onChange={(e) => {
                  // Search for the filter object and update it
                  const newFilterObjects = filterObjects.filter((fil: any) => {
                    return fil.id !== filterObject.id;
                  });

                  setFilterObjects(
                    [
                      ...newFilterObjects,
                      {
                        ...filterObject,
                        data: [
                          filterObject?.data[0],
                          parseInt(e.target.value) || null,
                        ],
                      },
                    ].sort((a, b) => a.id - b.id)
                  );
                }}
              />
            </Stack>

            {/*Delete filter*/}
            <Button
              size={"xs"}
              onClick={() => {
                // Delete self from filter objects
                const newFilterObjects = filterObjects.filter((filObj: any) => {
                  return filObj.id !== filterObject.id;
                });
                setFilterObjects(newFilterObjects);
              }}
            >
              Delete
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

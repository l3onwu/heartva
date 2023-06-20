import { filterButtonFactory } from "./FilterButtonFactory";
import { FilterObjectType } from "../views/HRGraphPage";
import { Stack, Text, Select } from "@chakra-ui/react";

const ActivitiesHeader = ({
  selectedFilter,
  filterObjects,
  setFilterObjects,
  setSelectedFilter,
}: {
  selectedFilter: string;
  filterObjects: FilterObjectType[];
  setFilterObjects: React.Dispatch<React.SetStateAction<FilterObjectType[]>>;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Stack
      direction={"row"}
      spacing={4}
      mb={"10px"}
      align={"baseline"}
      width={"100%"}
      overflow={"scroll"}
    >
      <Text fontSize="20px" color="white" fontWeight={"semibold"} mb="10px">
        Activities
      </Text>

      {/*Filter buttons*/}
      <Select
        size={"xs"}
        fontSize="14px"
        color="white"
        fontWeight={"semibold"}
        value={selectedFilter}
        width={"fit-content"}
        borderRadius={"5px"}
        padding={"0px"}
        borderColor={"#444444"}
        mr={"20px"}
        onChange={(e) => {
          let newFilterObject = {};
          if (e.target.value === "hrFilter") {
            newFilterObject = {
              id: filterObjects[0]
                ? filterObjects[filterObjects.length - 1]?.id + 1
                : 0,
              type: "hrFilter",
              data: [0, 100],
            };
          }
          if (e.target.value === "paceFilter") {
            newFilterObject = {
              id: filterObjects[0]
                ? filterObjects[filterObjects.length - 1]?.id + 1
                : 0,
              type: "paceFilter",
              data: [null, null],
            };
          }
          // @ts-ignore
          setFilterObjects([...filterObjects, newFilterObject]);
          setSelectedFilter("");
        }}
      >
        <option value={""}>Add filter</option>
        <option value={"hrFilter"}>HR</option>
        <option value={"paceFilter"}>Pace</option>
      </Select>

      {/*Map filter objects into own components*/}
      {filterObjects.map((filterObject: FilterObjectType) => {
        return filterButtonFactory({
          filterObject,
          filterObjects,
          setFilterObjects,
        });
      })}
    </Stack>
  );
};

export default ActivitiesHeader;

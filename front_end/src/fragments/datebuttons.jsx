import FilterMenu from "./filtermenu";
import SwitchControl from "./switch";
import { VStack, Group, Input, Button } from "@chakra-ui/react";

const DateButtons = ({
  startdate,
  updateDate,
  endDate,
  handleRefresh,
  searchForDate,
}) => {
  return (
    <>
      <VStack gap={2} alignItems="flex-start">
        <Input
          type="date"
          name="startdate"
          placeholder="Start Date"
          value={startdate}
          onChange={(e) => updateDate}
          size="sm"
        ></Input>
        <Input
          type="date"
          name="enddate"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => updateDate}
          size="sm"
        ></Input>
        <Button
          type="submit"
          maxW="100%"
          colorPalette="blue"
          alignSelf="stretch"
          onClick={searchForDate}
        >
          Search for entries
        </Button>
        <Button
          type="submit"
          maxW="100%"
          colorPalette="blue"
          alignSelf="stretch"
          onClick={handleRefresh}
        >
          Reset entries
        </Button>
      </VStack>
    </>
  );
};

export default DateButtons;

import {
  JobEntryBarChart,
  JobEntryPieChart,
} from "@/fragments/visualization/charts";

import mockJobEntries from "@/mockdata/mockjobentries";
import { Box, Heading, Flex, VStack } from "@chakra-ui/react";
import DateButtons from "@/fragments/datebuttons";
import { useEffect, useMemo, useState } from "react";
import { useEntriesHook } from "@/effects/hooks";
import { protectedGetRequest } from "@/utils/requests";
import LoadingPlaceholder from "@/fragments/loading";
import EmptyContainer from "@/fragments/emptycontainer";
const Visualization = () => {
  const { entries, setEntries, fetchError, loading } = useEntriesHook(
    "/entry/retrieve/all"
  );

  const [searchToggled, setSearchToggled] = useState({
    toggled: false,
    message: "",
  });

  const [filter, setFilter] = useState({
    dateRange: "",
  });
  const [success, setSuccess] = useState({
    message: "",
    status: false,
  });

  const [error, setError] = useState({
    message: "",
    status: false,
  });

  const filteredEntries = useMemo(() => {
    let result = [...entries];
    if (filter.dateRange) {
      const startDate = new Date(filter.dateRange.startDate);
      const endDate = new Date(filter.dateRange.endDate);
      setSearchToggled({
        ...searchToggled,
        toggled: true,
        message: `Showing results from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
      });
      result = result.filter((entry) => {
        return !(
          new Date(entry.dateapplied).toLocaleDateString() >=
            startDate.toLocaleDateString() &&
          new Date(entry.dateapplied).toLocaleDateString() <=
            endDate.toLocaleDateString()
        );
      });
    }

    return result;
  }, [entries, filter]);

  const handleDateRange = (startDate, endDate) => {
    setFilter((f) => ({ ...f, dateRange: { startDate, endDate } }));
  };

  const handleRefresh = () => {
    setSearchToggled({ ...form, toggled: false, message: "" });
    setFilter({ dateRange: null });
  };

  return (
    <>
      <Flex align="flex-start" minH="100vh" px={4} py={6} gap={8}>
        <Box minW="220px" maxW="260px">
          <VStack align="stretch" gap={4}>
            <DateButtons
              handleRefresh={handleRefresh}
              searchForDate={handleDateRange}
            ></DateButtons>
          </VStack>
        </Box>
        <Box flex="1">
          {loading && <LoadingPlaceholder></LoadingPlaceholder>}
          {fetchError && (
            <EmptyContainer
              message={"Error in loading entries, please try again later"}
            ></EmptyContainer>
          )}
          {(() => {
            if (!loading && !fetchError) {
              if (entries.length > 0) {
                return (
                  <>
                    <Heading textAlign="center">
                      {searchToggled.toggled
                        ? searchToggled.message
                        : "All Time Job Entries Visualization"}
                    </Heading>
                    <Box width="100%" height="400px" marginTop={4}>
                      <JobEntryBarChart jobEntries={filteredEntries} />
                    </Box>

                    <Box
                      width="100%"
                      height="400px"
                      marginTop={4}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <JobEntryPieChart jobEntries={filteredEntries} />
                    </Box>
                  </>
                );
              } else {
                return (
                  <EmptyContainer
                    message={"No job entries found, please add some!"}
                  ></EmptyContainer>
                );
              }
            }
          })()}
        </Box>
      </Flex>
    </>
  );
};

export default Visualization;

import {
  JobEntryBarChart,
  JobEntryPieChart,
} from "@/fragments/visualization/charts";

import mockJobEntries from "@/mockdata/mockjobentries";
import { Box, Heading, Flex, VStack } from "@chakra-ui/react";
import DateButtons from "@/fragments/datebuttons";
import { useState } from "react";
const Visualization = () => {
  const [dateForm, setDateForm] = useState({
    startdate: "",
    enddate: "",
  });

  const handleRefresh = () => {};

  const handleChange = (e) => {
    setDateForm({ ...dateForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Flex align="flex-start" minH="100vh" px={4} py={6} gap={8}>
        <Box minW="220px" maxW="260px">
          <VStack align="stretch" gap={4}>
            <DateButtons
              startdate={dateForm.startdate}
              endDate={dateForm.enddate}
              handleRefresh={handleRefresh}
              updateDate={handleChange}
            ></DateButtons>
          </VStack>
        </Box>
        <Box flex={1}>
          <Heading textAlign="center">
            Job Hunt for {new Date().toLocaleDateString()}
          </Heading>
          <Box width="100%" height="400px" marginTop={4}>
            <JobEntryBarChart jobEntries={mockJobEntries} />
          </Box>

          <Box
            width="100%"
            height="400px"
            marginTop={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <JobEntryPieChart jobEntries={mockJobEntries} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Visualization;

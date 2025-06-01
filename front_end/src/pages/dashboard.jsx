import JobEntry from "@/fragments/jobentry";
import mockJobEntries from "@/mockdata/mockjobentries";
import JobEntryMapper from "@/fragments/jobentrymapper";
import JobTable from "@/fragments/tableentry";
import TableView from "@/fragments/tableentryview";
import FilterMenu from "@/fragments/filtermenu";
import SwitchControl from "@/fragments/switch";
import { Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import { useReducer, useState } from "react";
import {
  CreateJobForm,
  DeleteJobForm,
  EditJobForm,
} from "@/fragments/jobforms";
import filterReducer from "@/reducers/filterreducer";

import DateButtons from "@/fragments/datebuttons";
import { protectedDeleteRequest } from "@/utils/requests";

const Dashboard = () => {
  const [view, setView] = useState(false);
  const [entries] = useState(mockJobEntries);
  const [selection, setSelection] = useState([]);
  
  const [formDisplayed, setFormDisplayed] = useState({
    addForm: false,
    deleteForm: false,
    editForm: false,
  });

  const [filterCriteria, dispatch] = useReducer(filterReducer, mockJobEntries);

  const filterSalaryAscending = () => {
    dispatch({ type: "SET_SALARY_ASC" });
  };
  const filterSalaryDescending = () => {
    dispatch({ type: "SET_SALARY_DESC" });
  };

  const filterDateAscending = () => {
    dispatch({ type: "SET_DATE_ASC" });
  };

  const filterDateDescending = () => {
    dispatch({ type: "SET_DATE_DESC" });
  };

  const filterStatus = (status) => {
    dispatch({ type: "SET_STATUS", payload: status });
  };

  const handleRefresh = () => {
    dispatch({ type: "RESET", payload: entries });
  };

  const handleDeleteCard = () => {};

  const handleEdit = () => {};

  const handleDeleteCell = async () => {
    try {
      const response = await protectedDeleteRequest("/delete", selection[0]);
    } catch (error) {}
  };

  return (
    <>
      <CreateJobForm
        formOpen={formDisplayed.addForm}
        handleFormClose={() =>
          setFormDisplayed({ ...formDisplayed, addForm: false })
        }
      ></CreateJobForm>
      <EditJobForm
        formOpen={formDisplayed.editForm}
        handleFormClose={(e) =>
          setFormDisplayed({ ...formDisplayed, editForm: false })
        }
        entry={filterCriteria.find((entry) => entry.id === selection[0])}
      ></EditJobForm>
      <DeleteJobForm
        formOpen={formDisplayed.deleteForm}
        handleFormClose={() =>
          setFormDisplayed({
            ...formDisplayed,
            deleteForm: false,
          })
        }
      ></DeleteJobForm>
      <Flex align="flex-start" minH="100vh" px={4} py={6} gap={8}>
        <Box minW="220px" maxW="260px">
          <VStack align="stretch" gap={4}>
            <SwitchControl
              toggled={view}
              setToggle={() => {
                setSelection([]);
                setView(!view);
              }}
              headingTitle={"Switch Job View"}
            ></SwitchControl>
            <FilterMenu
              onStatus={filterStatus}
              onDateAsc={filterDateAscending}
              onDateDesc={filterDateDescending}
              onSalaryAsc={filterSalaryAscending}
              onSalaryDesc={filterSalaryDescending}
            ></FilterMenu>
            <DateButtons handleRefresh={handleRefresh}></DateButtons>
          </VStack>
        </Box>
        <Box flex="1">
          <Flex justify="flex-end" mb={4}>
            <Button
              colorPalette="blue"
              onClick={() =>
                setFormDisplayed({ ...formDisplayed, addForm: true })
              }
            >
              Add Job
            </Button>
          </Flex>
          {!view && (
            <JobEntryMapper
              jobs={filterCriteria}
              displayEditForm={(job) => {
                setSelection([job]);
                setFormDisplayed({ ...formDisplayed, editForm: true });
              }}
              displayDeleteForm={(job) => {
                setSelection([job]);
                setFormDisplayed({ ...formDisplayed, deleteForm: true });
              }}
            ></JobEntryMapper>
          )}
          {view && (
            <JobTable
              items={filterCriteria}
              selection={selection}
              setSelection={setSelection}
              displayEditForm={() => {
                setFormDisplayed({ ...formDisplayed, editForm: true });
              }}
              displayDeleteForm={() =>
                setFormDisplayed({ ...formDisplayed, deleteForm: true })
              }
            ></JobTable>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
// This is a placeholder component for the dashboard page.

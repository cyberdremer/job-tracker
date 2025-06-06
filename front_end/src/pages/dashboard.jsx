import JobEntry from "@/fragments/jobentry";
import mockJobEntries from "@/mockdata/mockjobentries";
import JobEntryMapper from "@/fragments/jobentrymapper";
import JobTable from "@/fragments/tableentry";
import TableView from "@/fragments/tableentryview";
import FilterMenu from "@/fragments/filtermenu";
import SwitchControl from "@/fragments/switch";
import { Alert, Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import timer from "@/utils/popuptimer";
import { useReducer, useState } from "react";
import {
  CreateJobForm,
  DeleteJobForm,
  EditJobForm,
} from "@/fragments/jobforms";
import filterReducer from "@/reducers/filterreducer";

import DateButtons from "@/fragments/datebuttons";
import {
  postRequest,
  protectedDeleteRequest,
  protectedGetRequest,
  protectedPostRequest,
} from "@/utils/requests";
import AlertBox from "@/alerts/alertbox";
import { useEntriesHook } from "@/effects/hooks";
import LoadingPlaceholder from "@/fragments/loading";
import EmptyContainer from "@/fragments/emptycontainer";

const Dashboard = () => {
  const [view, setView] = useState(false);
  const { entries, setEntries, fetchError, loading } = useEntriesHook(
    "/entry/retrieve/past-thirty-days"
  );

  const [selection, setSelection] = useState([]);

  const [success, setSuccess] = useState({
    message: "",
    ocurred: false,
  });

  const [error, setError] = useState({
    message: "",
    ocurred: false,
  });

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

  const handleEdit = async (formData) => {
    try {
      const response = await protectedPostRequest("/entry/update", formData);
      if (response.error) {
        throw new Error(response.error.message);
      }
      const copy = [...entries];
      const idxToEdit = copy.findIndex((entry) => {
        return entry.id === selection[0];
      });

      copy[idxToEdit] = editEntry;
      setEntries(copy);

      setSuccess({
        message: response.data.message,
        ocurred: true,
      });

      setTimeout(() => {
        setSuccess({
          message: "",
          ocurred: false,
        });
      });
    } catch (error) {
      setError({
        message: error.message,
        ocurred: true,
      });
      setTimeout(() => {
        setError({
          message: "",
          ocurred: false,
        });
      }, timer);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await protectedDeleteRequest("/delete", selection[0]);
      if (response.error) {
        throw new Error(response.error.message);
      }

      setSuccess({
        message: response.data.message,
        ocurred: true,
      });

      const entryCopy = [...entries];
      setEntries(
        entryCopy.filter((entries) => {
          return entries.id !== selection[0];
        })
      );

      setTimeout(() => {
        setSuccess({
          message: "",
          ocurred: false,
        });
      }, timer);
    } catch (error) {
      setSuccess({
        message: error.message,
        ocurred: false,
      });

      setTimeout(() => {
        setSuccess({
          message: "",
          ocurred: false,
        });
      });
    }
  };

  const handleSearch = async (startDate, endDate) => {
    try {
      const startSearchDate = new Date(startDate)
        .toLocaleDateString()
        .replaceAll("/", "-");
      const endSearchDate = new Date(endDate)
        .toLocaleDateString()
        .replaceAll("/", "-");
      const response = await protectedGetRequest(
        `/entry/retrieve/${startSearchDate + "-" + endSearchDate}`
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      setSuccess({
        ocurred: true,
        message: response.data.message,
      });

      setTimeout(() => {
        setSuccess({
          ocurred: false,
          message: "",
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        ocurred: true,
      });

      setTimeout(() => {
        setError({
          message: "",
          ocurred: false,
        });
      });
    }
  };

  const handleCreate = async (form) => {
    try {
      const response = await protectedPostRequest("/entry/create", form);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setSuccess({
        message: response.data.message,
        ocurred: true,
      });
      setEntries([...entries, response.data.entry]);
      setTimeout(() => {
        setSuccess({
          message: "",
          ocurred: false,
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        ocurred: true,
      });
      setTimeout(() => {
        setError({
          message: "",
          ocurred: true,
        });
      }, timer);
    }
  };

  return (
    <>
      {error.ocurred && (
        <AlertBox title="Error" message={error.message} type="error"></AlertBox>
      )}
      {success.ocurred && (
        <AlertBox
          title="Success"
          message={success.message}
          type="success"
        ></AlertBox>
      )}
      <CreateJobForm
        formOpen={formDisplayed.addForm}
        handleFormClose={() =>
          setFormDisplayed({ ...formDisplayed, addForm: false })
        }
        handleSubmission={handleCreate}
      ></CreateJobForm>
      <EditJobForm
        formOpen={formDisplayed.editForm}
        handleFormClose={(e) =>
          setFormDisplayed({ ...formDisplayed, editForm: false })
        }
        handleSubmission={handleEdit}
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
        handleDelete={handleDelete}
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
          {loading && <LoadingPlaceholder></LoadingPlaceholder>}
          {fetchError && (
            <EmptyContainer
              message={"Error In Loading Entries, Please Try Again Later"}
            ></EmptyContainer>
          )}
          {(() => {
            if (!loading && !fetchError) {
              if (entries.length > 0) {
                if (view) {
                  return (
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
                  );
                } else {
                  return (
                    <JobEntryMapper
                      jobs={filterCriteria}
                      displayEditForm={(job) => {
                        setSelection([job]);
                        setFormDisplayed({ ...formDisplayed, editForm: true });
                      }}
                      displayDeleteForm={(job) => {
                        setSelection([job]);
                        setFormDisplayed({
                          ...formDisplayed,
                          deleteForm: true,
                        });
                      }}
                    ></JobEntryMapper>
                  );
                }
              } else {
                return (
                  <EmptyContainer message="No job entries found"></EmptyContainer>
                );
              }
            }
          })()}
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
// This is a placeholder component for the dashboard page.

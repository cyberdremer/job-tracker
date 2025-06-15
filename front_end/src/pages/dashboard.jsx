import JobEntry from "@/fragments/jobentry";
import mockJobEntries from "@/mockdata/mockjobentries";
import JobEntryMapper from "@/fragments/jobentrymapper";
import JobTable from "@/fragments/tableentry";
import TableView from "@/fragments/tableentryview";
import FilterMenu from "@/fragments/filtermenu";
import SwitchControl from "@/fragments/switch";
import { Alert, Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import timer from "@/utils/popuptimer";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  CreateJobForm,
  DeleteJobForm,
  EditJobForm,
} from "@/fragments/jobforms";
import filterReducer from "@/reducers/filterreducer";

import DateButtons from "@/fragments/datebuttons";
import {
  postRequest,
  protectedPutRequest,
  protectedDeleteRequest,
  protectedGetRequest,
  protectedPostRequest,
} from "@/utils/requests";
import AlertBox from "@/alerts/alertbox";
import { useEntriesHook } from "@/effects/hooks";
import LoadingPlaceholder from "@/fragments/loading";
import EmptyContainer from "@/fragments/emptycontainer";
import mapJobEntry from "@/utils/mapper";

const Dashboard = () => {
  const [view, setView] = useState(false);
  const { entries, setEntries, fetchError, loading, setLoading } =
    useEntriesHook("/entry/retrieve/all");

  // const [entries, setEntries] = useState(mockJobEntries);

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

  const [filter, setFilter] = useState({
    status: "",
    salaryOrder: "",
    dateOrder: "",
  });

  const filteredEntries = useMemo(() => {
    let result = [...entries];
    if (filter.status) {
      result = result.filter(
        (entry) => entry.status.toUpperCase() === filter.status.toUpperCase()
      );
    }
    if (filter.salaryOrder) {
      result = result.sort((a, b) => {
        return filter.salaryOrder === "asc"
          ? Number(b.salary) - Number(a.salary)
          : Number(a.salary) - Number(b.salary);
      });
    }
    if (filter.dateOrder) {
      result = result.sort((a, b) => {
        return filter.dateOrder === "asc"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    if (filter.dateRange) {
      const startDate = new Date(filter.dateRange.startDate);
      const endDate = new Date(filter.dateRange.endDate);
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

  const filterStatus = (status) => {
    setFilter((f) => ({
      ...f,
      status: status,
    }));
  };

  const filterSalary = (order) => {
    setFilter((f) => ({ ...f, salaryOrder: order }));
  };

  const filterDate = (order) => {
    setFilter((f) => ({ ...f, dateOrder: order }));
  };
  const handleDateRange = (startDate, endDate) => {
    setFilter((f) => ({ ...f, dateRange: { startDate, endDate } }));
  };
  const handleRefresh = () => {
    setFilter({ status: null, salaryOrder: null, dateOrder: null });
  };

  const handleEdit = async (formData) => {
    try {
      const response = await protectedPutRequest(
        `/entry/update/${selection[0]}`,
        formData
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      const copy = [...entries];
      const idxToEdit = copy.findIndex((entry) => {
        return entry.id === selection[0];
      });

      copy[idxToEdit] = mapJobEntry(formData);
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
      setFormDisplayed({ ...formDisplayed, editForm: false });
      setSelection([]);
      setTimeout(() => {
        setError({
          message: "",
          ocurred: false,
        });
      }, timer);
    } finally {
      setFormDisplayed({ ...formDisplayed, editForm: false });
      setSelection([]);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await protectedDeleteRequest("/entry/delete", selection);
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
          return !selection.includes(entries.id);
        })
      );

      setSelection([]);

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
    } finally {
      setFormDisplayed({ ...formDisplayed, deleteForm: false });
      setSelection([]);
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

      setFormDisplayed({ ...formDisplayed, addForm: false });
      setEntries([...entries, mapJobEntry(response.data.entry)]);
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
    } finally {
      setFormDisplayed({ ...formDisplayed, addForm: false });
      setSelection([]);
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
        entry={filteredEntries.find((entry) => entry.id === selection[0])}
      ></EditJobForm>
      <DeleteJobForm
        formOpen={formDisplayed.deleteForm}
        handleFormClose={() =>
          setFormDisplayed({
            ...formDisplayed,
            deleteForm: false,
          })
        }
        selection={selection}
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
              onDateAsc={() => filterDate("asc")}
              onDateDesc={() => filterDate("desc")}
              onSalaryAsc={() => filterSalary("asc")}
              onSalaryDesc={() => filterSalary("desc")}
            ></FilterMenu>
            <DateButtons
              handleRefresh={handleRefresh}
              searchForDate={handleDateRange}
            ></DateButtons>
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
                      items={filteredEntries}
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
                      jobs={filteredEntries}
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

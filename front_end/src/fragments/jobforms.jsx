import GenericModal from "@/genericcomponents/genericmodal";
import {
  Input,
  Textarea,
  Field,
  createListCollection,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import GenericSelect from "@/genericcomponents/genericselect";
import { useState } from "react";

const selectOptions = createListCollection({
  items: [
    "Applying",
    "Interviewing",
    "Rejected",
    "Accepted",
    "Closed",
    "Awaiting",
    "Applied",
  ],
});

const CreateJobForm = ({ formOpen, handleFormClose, value }) => {
  const [selectValue, setSelectValue] = useState([]);
  return (
    <GenericModal
      title={"Create Job Entry"}
      open={formOpen}
      role={"dialog"}
      handleClose={handleFormClose}
      footerButtons={
        <HStack gap={3} justify={"flex-start"} w={"100%"}>
          <Button colorPalette="green">
            <Text>Create Job Entry</Text>
          </Button>
          <Button variant="outline" onClick={handleFormClose}>
            Cancel
          </Button>
        </HStack>
      }
    >
      <Field.Root required>
        <Field.Label>Paste the job entry here!</Field.Label>
        <Textarea placeholder="Job Descriptiopn"></Textarea>
        <Field.HelperText>
          PS. you can paste from any job scraping site!
        </Field.HelperText>
      </Field.Root>
      <GenericSelect
        selectItems={selectOptions}
        label={"Application Status"}
        handleClick={() => {}}
        name={"status"}
        value={selectValue}
      ></GenericSelect>
    </GenericModal>
  );
};

const DeleteJobForm = ({ formOpen, handleFormClose, handleDelete, value }) => {
  const [selectValue, setSelectValue] = useState([]);
  return (
    <GenericModal
      title={"Delete Job Entry"}
      open={formOpen}
      role={"dialog"}
      handleClose={handleFormClose}
      footerButtons={
        <HStack gap={3} justify="flex-start" w={"100%"}>
          <Button colorPalette="red" onClick={handleDelete}>
            <Text>Delete Entry</Text>
          </Button>
          <Button variant="outline" onClick={handleFormClose}>
            Cancel
          </Button>
        </HStack>
      }
    >
      <Text>Are you sure you want to delete this entry?</Text>
    </GenericModal>
  );
};

const EditJobForm = ({ formOpen, handleFormClose, handleSubmission }) => {
  const [selectValue, setSelectValue] = useState([]);
  return (
    <GenericModal
      title={"Edit Job Entry"}
      open={formOpen}
      handleClose={handleFormClose}
      footerButtons={
        <>
          <HStack gap={3} justify="flex-start" w={"100%"}>
            <Button colorPalette={"blue"} onClick={handleSubmission}>
              Edit Job Entry
            </Button>
            <Button variant="outline">Cancel</Button>
          </HStack>
        </>
      }
    ></GenericModal>
  );
};

export { CreateJobForm, DeleteJobForm, EditJobForm };

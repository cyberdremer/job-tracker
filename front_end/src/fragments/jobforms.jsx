import GenericModal from "@/genericcomponents/genericmodal";
import {
  Input,
  Textarea,
  Field,
  createListCollection,
  Text,
  Button,
  HStack,
  Fieldset,
  Stack,
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

const CreateJobForm = ({
  formOpen,
  handleFormClose,
  handleSubmission,
  value,
}) => {
  const [selectValue, setSelectValue] = useState([]);

  const [form, setForm] = useState({
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    handleSubmission(form);
  };
  return (
    <GenericModal
      title={"Create Job Entry"}
      open={formOpen}
      role={"dialog"}
      handleClose={handleFormClose}
      footerButtons={
        <HStack gap={3} justify={"flex-start"} w={"100%"}>
          <Button colorPalette="green" onClick={handleSubmission}>
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
        <Textarea
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          name="description"
        ></Textarea>
        <Field.HelperText>
          PS. you can paste from any job scraping site!
        </Field.HelperText>
      </Field.Root>
      <GenericSelect
        selectItems={selectOptions}
        label={"Application Status"}
        handleClick={setSelectValue}
        name={"status"}
        value={selectValue}
      ></GenericSelect>
    </GenericModal>
  );
};

const DeleteJobForm = ({ formOpen, handleFormClose, handleDelete }) => {
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

const EditJobForm = ({
  formOpen,
  handleFormClose,
  handleSubmission,
  entry,
}) => {
  const [selectValue, setSelectValue] = useState([]);

  const [form, setForm] = useState({
    title: entry?.title || "",
    company: entry?.company || "",
    location: entry?.location || "",
    salary: entry?.salary || "",
    date: entry?.createdat || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    handleSubmission(form);
  };
  return (
    <GenericModal
      title={"Edit Job Entry"}
      open={formOpen}
      handleClose={handleFormClose}
      footerButtons={
        <>
          <Fieldset.Root>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Job Title: </Field.Label>
                <Input
                  name="title"
                  placeholder={entry?.title || ""}
                  value={form.title}
                  onChange={handleChange}
                ></Input>
              </Field.Root>

              <Field.Root>
                <Field.Label>Company: </Field.Label>
                <Input
                  name="company"
                  placeholder={entry?.company || ""}
                  value={form.company}
                  onChange={handleChange}
                ></Input>
              </Field.Root>

              <Field.Root>
                <Field.Label>Location: </Field.Label>
                <Input
                  name="location"
                  placeholder={entry?.location || ""}
                  value={form.location}
                  onChange={handleChange}
                ></Input>
              </Field.Root>

              <Field.Root>
                <Field.Label>Salary: </Field.Label>
                <Input
                  name="salary"
                  placeholder={entry?.salary || ""}
                  form={form.salary}
                  onChange={handleChange}
                ></Input>
              </Field.Root>

              <Field.Root>
                <Field.Label>Date Applied</Field.Label>
                <Input
                  name="date"
                  type="date"
                  placeholder={new Date(entry?.createdat) || ""}
                  value={form.date}
                  onChange={handleChange}
                ></Input>
              </Field.Root>

              <Field.Root></Field.Root>
            </Fieldset.Content>
            <HStack gap={3} justify="flex-start" w={"100%"}>
              <Button colorPalette={"blue"} onClick={onSubmit}>
                Edit Job Entry
              </Button>
              <Button variant="outline" onClick={handleFormClose}>
                Cancel
              </Button>
            </HStack>
          </Fieldset.Root>
        </>
      }
    ></GenericModal>
  );
};

export { CreateJobForm, DeleteJobForm, EditJobForm };

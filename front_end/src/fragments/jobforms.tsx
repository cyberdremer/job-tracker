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
import { useFormik } from "formik";

import {
  boostrapCreateJobFormSchema,
  bootstrapEditJobFormSchema,
  CreateJobFormValues,
} from "@/yupschemas/yupjubforms";

const STATUS_OPTIONS = [
  { label: "Applying", value: "APPLYING" },
  { label: "Interviewing", value: "INTERVIEWING" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Closed", value: "CLOSED" },
  { label: "Awaiting", value: "AWAITING" },
  { label: "Applied", value: "APPLIED" },
] as const;

type SelectionOption = (typeof STATUS_OPTIONS)[number];

const selectOptions = createListCollection<SelectionOption>({
  items: STATUS_OPTIONS,
});

interface CreateJobFormProps {
  formOpen: boolean;
  handleFormClose: () => void;
}

const CreateJobForm = ({
  formOpen,
  handleFormClose,
  handleSubmission,
  value,
}) => {
  const [selectValue, setSelectValue] = useState([]);
  const initialFormikValues: CreateJobFormValues = {
    description: "",
    datepplied: "",
    link: "",
  };
  const formik = useFormik({
    initialValues: initialFormikValues,
    validationSchema: boostrapCreateJobFormSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <GenericModal
      title={"Create Job Entry"}
      open={formOpen}
      role={"dialog"}
      handleClose={handleFormClose}
      footerButtons={
        <HStack gap={3} justify={"flex-start"} w={"100%"}>
          <Button colorPalette="green" onClick={() => formik.handleSubmit}>
            <Text>Create Job Entry</Text>
          </Button>
          <Button variant="outline" onClick={handleFormClose}>
            Cancel
          </Button>
        </HStack>
      }
    >
      <Field.Root required={true}>
        <Field.Label>Paste the job entry here!</Field.Label>
        <Textarea
          placeholder="Job Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          name="description"
        ></Textarea>
        <Field.HelperText>
          PS. you can paste from any job scraping site!
        </Field.HelperText>
      </Field.Root>

      <Field.Root required={false}>
        <Field.Label>Link To Job: (if applicable) </Field.Label>
        <Input
          name="link"
          value={formik.values.link}
          onChange={formik.handleChange}
        ></Input>
        <Field.HelperText>Enter the job posting link here.</Field.HelperText>
      </Field.Root>

      <GenericSelect
        selectItems={selectOptions}
        label={"Application Status"}
        handleClick={(e) => setSelectValue(e.value)}
        name={"status"}
        value={selectValue}
      ></GenericSelect>
      <Field.Root required={true}>
        <Field.Label>Date Applied: </Field.Label>
        <Input
          type="date"
          name="dateapplied"
          value={formik.values.datepplied}
          placeholder="Date Applied"
          onChange={formik.handleChange}
        ></Input>
      </Field.Root>
    </GenericModal>
  );
};

const DeleteJobForm = ({
  formOpen,
  handleFormClose,
  handleDelete,
  selection,
}) => {
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
      {selection.length > 1 ? (
        <Text>
          Are you sure you want to delete these {selection.length} entries?
        </Text>
      ) : (
        <Text>Are you sure you want to delete this entry?</Text>
      )}
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
    dateapplied: entry?.dateapplied || "",
    link: entry?.link || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const submittedForm = {
      title: form.title,
      company: form.company,
      location: form.location,
      salary: form.salary,
      dateapplied: form.dateapplied,
      link: form.link,
      status: selectValue[0],
      id: entry?.id,
    };
    handleSubmission(submittedForm);
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
                  name="dateapplied"
                  type="date"
                  placeholder={new Date(entry?.createdat).toDateString() || ""}
                  value={form.createdat}
                  onChange={handleChange}
                ></Input>
              </Field.Root>

              <Field.Root>
                <Field.Label>Link to job</Field.Label>
                <Input
                  name="link"
                  placeholder={entry?.link || ""}
                  value={form.link}
                  onChange={handleChange}
                ></Input>
              </Field.Root>

              <GenericSelect
                selectItems={selectOptions}
                label={"Application Status"}
                handleClick={(e) => setSelectValue(e.value)}
                name={"status"}
                value={selectValue}
              ></GenericSelect>
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

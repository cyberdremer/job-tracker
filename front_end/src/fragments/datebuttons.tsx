import FilterMenu from "./filtermenu";
import SwitchControl from "./switch";
import {
  VStack,
  Group,
  Input,
  Button,
  Fieldset,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
const DateButtons = ({
  handleRefresh,
  searchForDate,
}) => {
  const [form, setForm] = useState({
    enddate: "",
    startdate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleDateSearch = () => {
    searchForDate(form.startdate, form.enddate);
  };
  return (
    <>
      <VStack gap={2} alignItems="flex-start">
        <Fieldset.Root>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Start Date:</Field.Label>
              <Input
                type="date"
                name="startdate"
                placeholder="Start Date"
                value={form.startdate}
                onChange={handleChange}
                size="sm"
              ></Input>
            </Field.Root>

            <Field.Root>
              <Field.Label>End Date: </Field.Label>
              <Input
                type="date"
                name="enddate"
                placeholder="End Date"
                value={form.enddate}
                onChange={handleChange}
                size="sm"
              ></Input>
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>

        <Button
          type="submit"
          maxW="100%"
          colorPalette="blue"
          alignSelf="stretch"
          onClick={handleDateSearch}
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

import {
  Table,
  ActionBar,
  Button,
  Checkbox,
  Kbd,
  Portal,
  TableCell,
  Badge,
  FormatNumber,
} from "@chakra-ui/react";
import PaginationList from "./pagination";
import { useState } from "react";

const statusColor = {
  APPLYING: "blue",
  INTERVIEWING: "orange",
  REJECTED: "red",
  ACCEPTED: "green",
  CLOSED: "gray",
  AWAITING: "purple",
  APPLIED: "teal",
};
const JobTable = ({ items }) => {
  const [selection, setSelection] = useState([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const rows = items.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.id) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select Row"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) => {
              return changes.checked
                ? [...prev, item.id]
                : selection.filter((title) => title !== item.id);
            });
          }}
        >
          <Checkbox.HiddenInput></Checkbox.HiddenInput>
          <Checkbox.Control></Checkbox.Control>
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{item.title}</Table.Cell>
      <Table.Cell>{item.company}</Table.Cell>
      <Table.Cell>{item.location}</Table.Cell>
      <Table.Cell>
        {" "}
        <FormatNumber
          value={item.salary}
          currency="USD"
          style="currency"
        ></FormatNumber>
      </Table.Cell>
      <Table.Cell>{item.createdat}</Table.Cell>
      <Table.Cell>
        <Badge
          colorPalette={statusColor[item.status.trim().toUpperCase() || "grey"]}
        >
          {item.status}
        </Badge>
      </Table.Cell>
    </Table.Row>
  ));
  return (
    <>
      <Table.Root stickyHeader interactive variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox.Root
                size="sm"
                top="0.5"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? items.map((item) => item.id) : []
                  );
                }}
              >
                <Checkbox.HiddenInput></Checkbox.HiddenInput>
                <Checkbox.Control></Checkbox.Control>
              </Checkbox.Root>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Company</Table.ColumnHeader>
            <Table.ColumnHeader>Location</Table.ColumnHeader>
            <Table.ColumnHeader>Salary</Table.ColumnHeader>
            <Table.ColumnHeader>Date Applied</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selection.length} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator></ActionBar.Separator>
              <Button variant="outline" size="sm">
                Delete <Kbd>⌫</Kbd>
              </Button>
              <Button variant="outline">
                Edit <Kbd>E</Kbd>
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
      <PaginationList items={items}></PaginationList>
    </>
  );
};

export default JobTable;

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
  Link,
} from "@chakra-ui/react";
import PaginationList from "./pagination";
import React, { useState } from "react";
import { JobItem, JobStatus } from "@/interfaces/jobs";




export interface JobTableProps {
  items: JobItem[],
  displayDeleteForm: () => void;
  displayEditForm: () => void;
  selection: (string | number)[]
  setSelection: React.Dispatch<React.SetStateAction<(string | number)[]>>

}




const statusColor: Record<JobStatus, string> = {
  APPLYING: "blue",
  INTERVIEWING: "orange",
  REJECTED: "red",
  ACCEPTED: "green",
  CLOSED: "gray",
  AWAITNG: "purple",
  APPLIED: "teal",
};

const JobTable = ({
  items,
  displayDeleteForm,
  displayEditForm,
  selection,
  setSelection,
}: JobTableProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(items.length / pageSize);
  const startPage = (page - 1) * pageSize;
  const endPage = startPage + pageSize;

  const visibleItems = [...items].slice(startPage, endPage);
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const rows = visibleItems.map((item) => (
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
      <Table.Cell>
        {item.link === "" ? (
          <>{item.title}</>
        ) : (
          <Link target="_blank" href={item.link}>
            {item.title}
          </Link>
        )}
      </Table.Cell>
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
      <Table.Cell>{item.dateapplied}</Table.Cell>
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
              <Button variant="outline" size="sm" onClick={displayDeleteForm}>
                Delete <Kbd>⌫</Kbd>
              </Button>
              {selection.length <= 1 ? (
                <Button variant="outline" onClick={displayEditForm}>
                  Edit <Kbd>E</Kbd>
                </Button>
              ) : (
                ""
              )}
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
      <PaginationList
        items={items}
        pageSize={pageSize}
        page={page}
        setPage={setPage}
      ></PaginationList>
    </>
  );
};

export default JobTable;

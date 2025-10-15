import { Box, Flex } from "@chakra-ui/react";
import JobTable from "./tableentry";
import { JobItem } from "@/interfaces/jobs";
import { JobTableProps } from "./tableentry";


const TableView = ({ items }: JobTableProps) => {
  return (
    <>
      <JobTable items={items}></JobTable>
    </>
  );
};

export default TableView;

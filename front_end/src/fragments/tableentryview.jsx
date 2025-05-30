import { Box, Flex } from "@chakra-ui/react";
import JobTable from "./tableentry";
const TableView = ({ items }) => {
    
  return (
    <>
      <JobTable items={items}></JobTable>
    </>
  );
};

export default TableView;

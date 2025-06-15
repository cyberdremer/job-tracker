import { SimpleGrid, GridItem, Box, Flex } from "@chakra-ui/react";
import JobEntryCards from "./jobentry";
import PaginationList from "./pagination";
import { useState } from "react";
const JobEntryMapper = ({ jobs, displayEditForm, displayDeleteForm }) => {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const startPage = (page - 1) * pageSize;
  const endPage = startPage + pageSize;
  const visibleItems = [...jobs].slice(startPage, endPage);

  return (
    <>
    
      <Box overflowY={"auto"} maxHeight={"35rem"}>
        <SimpleGrid minChildWidth="md">
          {visibleItems.map((job) => {
            return (
              <GridItem key={job.id}>
                <JobEntryCards
                  {...job}
                  onDelete={() => displayDeleteForm(job.id)}
                  onEdit={() => displayEditForm(job.id)}
                ></JobEntryCards>
              </GridItem>
            );
          })}
        </SimpleGrid>
      </Box>
      <PaginationList
        items={jobs}
        pageSize={pageSize}
        page={page}
        setPage={setPage}
      ></PaginationList>
    </>
  );
};

export default JobEntryMapper;

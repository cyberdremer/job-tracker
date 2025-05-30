import { SimpleGrid, GridItem } from "@chakra-ui/react";
import JobEntryCards from "./jobentry";
const JobEntryMapper = ({ jobs, displayEditForm, displayDeleteForm }) => {
  return (
    <>
      <SimpleGrid minChildWidth="md">
        {jobs.map((job) => {
          return (
            <GridItem key={job.id}>
              <JobEntryCards
                {...job}
                onDelete={displayDeleteForm}
                onEdit={displayEditForm}
              ></JobEntryCards>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default JobEntryMapper;

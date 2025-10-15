import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import { JobItem } from "@/interfaces/jobs";

interface PaginationListProps {
  items: JobItem[];
  pageSize: number;
  page: number;
  setPage: (page: number) => void;
}

const PaginationList = ({
  items,
  pageSize,
  page,
  setPage,
}: PaginationListProps) => {
  return (
    <>
      <Pagination.Root
        count={items.length}
        pageSize={pageSize}
        defaultPage={1}
        page={page}
        alignSelf="center"
        marginTop="4"
        onPageChange={(e) => setPage(e.page)}
      >
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft></LuChevronLeft>
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          ></Pagination.Items>
          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight></LuChevronRight>
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </>
  );
};

export default PaginationList;

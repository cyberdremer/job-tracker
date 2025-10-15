import { JobItem, JobStatus } from "@/interfaces/jobs";
import {
  Button,
  Card,
  Heading,
  HStack,
  Stack,
  Badge,
  Text,
  FormatNumber,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft, FaTrash } from "react-icons/fa6";
import Tilt from "react-parallax-tilt";

const statusColor: Record<JobStatus, string> = {
  APPLYING: "blue",
  INTERVIEWING: "orange",
  REJECTED: "red",
  ACCEPTED: "green",
  CLOSED: "gray",
  AWAITNG: "purple",
  APPLIED: "teal",
};

interface JobEntryCardsProps {
  entry: JobItem;
  onEdit: () => void;
  onDelete: () => void;
}

const JobEntryCards = ({ entry, onEdit, onDelete }: JobEntryCardsProps) => {
  return (
    <Card.Root
      width="350px"
      minHeight="180px"
      margin="4"
      boxShadow="md"
      borderRadius="lg"
      padding="6"
    >
      <Tilt>
        <Card.Header>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="md">
              {entry.meta.link === "" ? (
                <>
                  <Text>{entry.job.title}</Text>
                </>
              ) : (
                <Link target="_blank" href={entry.meta.link}>
                  {entry.job.title}
                </Link>
              )}
            </Heading>
            <Badge
              colorPalette={
                statusColor[entry.meta.status?.toUpperCase()] || "gray"
              }
            >
              {entry.meta.status}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            {entry.job.company}
          </Text>
        </Card.Header>
        <Card.Body>
          <Stack>
            <Text>
              <b>Company: </b>
              {entry.job.company}
            </Text>
            <Text>
              <b>Location:</b> {entry.job.location}
            </Text>
            <Text>
              <b>Salary:</b>{" "}
              <FormatNumber
                value={Number(entry.job.salary)}
                style="currency"
                currency="USD"
              ></FormatNumber>
            </Text>
            <Text>
              <b>Date Applied:</b> {entry.job.dateapplied.toDateString()}
            </Text>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <HStack>
            <IconButton size="sm" colorScheme="blue" onClick={() => onEdit()}>
              <FaEdit></FaEdit>
            </IconButton>

            <IconButton
              size={"sm"}
              colorScheme="red"
              onClick={() => onDelete()}
            >
              <FaTrash></FaTrash>
            </IconButton>
          </HStack>
        </Card.Footer>
      </Tilt>
    </Card.Root>
  );
};

export default JobEntryCards;

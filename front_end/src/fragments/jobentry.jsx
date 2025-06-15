import {
  Button,
  Card,
  Heading,
  HStack,
  Stack,
  Badge,
  Text,
  FormatNumber,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Tilt from "react-parallax-tilt";

const statusColor = {
  APPLYING: "blue",
  INTERVIEWING: "orange",
  REJECTED: "red",
  ACCEPTED: "green",
  CLOSED: "gray",
  AWAITING: "purple",
  APPLIED: "teal",
};

const JobEntryCards = ({
  title,
  salary,
  location,
  company,
  status,
  link,
  id,
  onEdit,
  onDelete,
  dateapplied,
}) => {
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
                {link === "" ? (
                  <>
                    <Text>{title}</Text>
                  </>
                ) : (
                  <Link target="_blank" href={link}>
                    {title}
                  </Link>
                )}
              </Heading>
              <Badge colorPalette={statusColor[status?.toUpperCase()] || "gray"}>
                {status}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {company}
            </Text>
          </Card.Header>
          <Card.Body>
            <Stack spacing="1">
              <Text>
                <b>Company: </b>
                {company}
              </Text>
              <Text>
                <b>Location:</b> {location}
              </Text>
              <Text>
                <b>Salary:</b>{" "}
                <FormatNumber
                  value={salary}
                  style="currency"
                  currency="USD"
                ></FormatNumber>
              </Text>
              <Text>
                <b>Date Applied:</b> {dateapplied}
              </Text>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <HStack spacing="3">
              <Button size="sm" colorScheme="blue" onClick={() => onEdit()}>
                Edit
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => onDelete()}>
                Delete
              </Button>
            </HStack>
          </Card.Footer>
        </Tilt>
      </Card.Root>
    
  );
};

export default JobEntryCards;

import { Input, Alert, Text, Stack } from "@chakra-ui/react";
import GenericModal from "@/modal/genericmodal";

const DeleteJobListing = ({}) => {
  <GenericModal role="alertdialog" title="Deleting Listing">
    <Stack gap="5">
      <Text>
        Are you sure you would like to delete this job posting form your tracked
        jobs?
      </Text>
    </Stack>
  </GenericModal>;
};

const Alert = ({ message, type }) => {
  return (
    <Alert.Root
      status={type}
      variant="subtle"
      animationName="slide-from-top"
      animationDuration="slowest"
      maxW="30%"
      alignSelf="center"
      position={"absolute"}
      marginTop={2}
    >
      <Alert.Indicator />
      <Alert.Title>{message}</Alert.Title>
    </Alert.Root>
  );
};


export {Alert, DeleteJobListing}
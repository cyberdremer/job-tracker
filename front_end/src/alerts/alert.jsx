import { Input, Alert, Text, Stack } from "@chakra-ui/react";
import GenericModal from "@/genericcomponents/genericmodal";



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


export {Alert}
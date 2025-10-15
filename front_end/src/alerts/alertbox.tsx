import { Input, Alert, Text, Stack, CloseButton } from "@chakra-ui/react";

type Status = "info" | "warning" | "success" | "error" | "neutral";

interface AlertBoxProps {
  title: string;
  type: Status;
  message: string;
}

const AlertBox = ({ title, type, message }: AlertBoxProps) => {
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
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>{message}</Alert.Description>
      </Alert.Content>
      <CloseButton pos="relative" top="-2" insetEnd="-2"></CloseButton>
    </Alert.Root>
  );
};

export default AlertBox;

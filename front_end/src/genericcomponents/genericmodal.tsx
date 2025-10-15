import {
  CloseButton,
  Dialog,
  Portal,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";
const GenericModal = ({
  open,
  role,
  title,
  children,
  handleClose,
  footerButtons,
}) => {
  return (
    <>
      <Dialog.Root open={open} role={role}>
        <Portal>
          <Dialog.Backdrop></Dialog.Backdrop>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>{children}</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  {footerButtons}
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton onClick={handleClose} size="md"></CloseButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default GenericModal;

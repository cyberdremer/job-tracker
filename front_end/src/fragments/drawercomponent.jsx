import { Drawer, Text, Button, Portal, CloseButton } from "@chakra-ui/react";

const DrawerComponent = ({ children, open, title, close, placement }) => {
  return (
    <Drawer.Root open={open} placement={placement}>
      <Portal>
        <Drawer.Backdrop></Drawer.Backdrop>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{children}</Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton onClick={close} size="sm"></CloseButton>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DrawerComponent;

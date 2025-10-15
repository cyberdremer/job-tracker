import { Drawer, Text, Button, Portal, CloseButton } from "@chakra-ui/react";
import React from "react";

type Placement = "top" | "start" | "bottom" | "end";

interface DrawerComponentProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  close: () => void;
  placement: Placement;
}

const DrawerComponent = ({
  children,
  open,
  title,
  close,
  placement,
}: DrawerComponentProps) => {
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

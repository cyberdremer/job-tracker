import { Button, Menu, Portal } from "@chakra-ui/react";
import React from "react";
import { LuChevronRight } from "react-icons/lu";

interface MenuGenericProps {
  children: React.ReactNode;
  buttonMessage: string;
}

const MenuGeneric = ({ children, buttonMessage }: MenuGenericProps) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {buttonMessage}
        </Button>
      </Menu.Trigger>
      <Portal>{children}</Portal>
    </Menu.Root>
  );
};

export default MenuGeneric;

import { Button, Menu, Portal } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";

const MenuGeneric = ({ children, buttonMessage }) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {buttonMessage}
        </Button>
      </Menu.Trigger>
      <Portal>
        {children}
      </Portal>
    </Menu.Root>
  );
};

export default MenuGeneric;

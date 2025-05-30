import {
  Group,
  Heading,
  HStack,
  IconButton,
  Separator,
  For,
  Button,
  List,
  Icon,
  Avatar,
  AvatarRootProvider,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import dashboardRoutes from "@/pageroutes/sidebarroutes";
import DrawerComponent from "./drawercomponent";
import { Link } from "react-router";
const DashboardHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleDrawerToggle = (e) => {
    setDrawerVisible(!drawerVisible);
  };
  return (
    <>
      <HStack
        justifyContent="space-between"
        alignContent="center"
        padding="4"
        shadow="xl"
      >
        <Group>
          <DrawerComponent
            open={drawerVisible}
            close={handleDrawerToggle}
            placement="start"
            title="Dashboard Menu"
          >
            <List.Root variant="plain" align="center" gap="5">
              <For each={dashboardRoutes}>
                {(item, index) => (
                  <List.Item key={index}>
                    <Link to={item.path}>
                      <List.Indicator asChild>{item.icon}</List.Indicator>
                      {item.title}
                    </Link>
                  </List.Item>
                )}
              </For>
            </List.Root>
          </DrawerComponent>
          <IconButton onClick={handleDrawerToggle}>
            <FaBars></FaBars>
          </IconButton>
          <Heading size="5xl">Job.Tracker</Heading>
        </Group>

        <Group>
          <Avatar.Root>
            <Avatar.Fallback name="Ai Artist"></Avatar.Fallback>
          </Avatar.Root>
        </Group>
      </HStack>
      <Separator></Separator>
    </>
  );
};

export default DashboardHeader;

import { Outlet } from "react-router";
import { Flex } from "@chakra-ui/react";
import DashboardHeader from "@/fragments/dashboardheader";

const AuthedLayout = ({ children }) => {
  return (
    <>
      <Flex grow="1" direction="column" minHeight="100vh">
        <DashboardHeader></DashboardHeader>
        <Flex flex="1" direction="column">
          <Outlet></Outlet>
        </Flex>
      </Flex>
    </>
  );
};

export default AuthedLayout;

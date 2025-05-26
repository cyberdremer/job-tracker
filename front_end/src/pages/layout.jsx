import { Outlet } from "react-router";
import { Flex } from "@chakra-ui/react";
import Header from "@/fragments/header";
import Footer from "@/fragments/footer";
const Layout = () => {
  return (
    <>
      <Flex grow="1" direction="column" minHeight="100vh">
        <Header></Header>
        <Flex flex="1" direction="column">
          <Outlet></Outlet>
        </Flex>
        <Footer></Footer>
      </Flex>
    </>
  );
};

export default Layout;

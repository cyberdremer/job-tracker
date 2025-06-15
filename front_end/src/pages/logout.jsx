import { AuthContext } from "@/context/authcontext";
import { Flex, Heading, VStack, Button } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const LogOut = () => {
  const navigate = useNavigate();
  const { destroySession } = useContext(AuthContext);

  useEffect(() => {
    const logoutAndRedirect = async () => {
      await destroySession();
    };

    logoutAndRedirect();
  });
  return (
    <>
      <Flex
        direction="column"
        animationName="fade-in"
        animationDuration="slowest"
        minHeight="100vh"
      >
        <VStack
          alignItems="center"
          alignSelf="center"
          flex="1"
          justifyContent="center"
          gap="10"
        >
          <Heading>You have succesfully logged out!</Heading>
          <Button onClick={() => navigate("/")}>Home Page</Button>
        </VStack>
      </Flex>
    </>
  );
};

export default LogOut;

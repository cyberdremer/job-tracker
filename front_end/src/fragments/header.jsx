import { Group, HStack, Heading, Separator, Icon } from "@chakra-ui/react";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router";
const Header = ({}) => {
  return (
    <>
      <HStack
        justifyContent="space-between"
        alignContent="center"
        padding="4"
        shadow="xl"
      >
        <Heading size="5xl">Job.Tracker</Heading>
        <Group gap="6">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </Group>
      </HStack>
      <Separator></Separator>
    </>
  );
};

export default Header;

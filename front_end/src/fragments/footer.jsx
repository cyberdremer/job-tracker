import { Text, Link, Container } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
const Footer = () => {
  return (
    <Container minW="100%" maxW="100%" padding="0" margin="0">
      <footer
        style={{
          minWidth: "100%",
          minHeight: "3rem",
          background: "black",
        }}
      >
        <Text textAlign="center" padding="0.5rem" color={"white"}>
          <Link href="https://github.com/cyberdremer" color="white">
            Cyberdremer <LuExternalLink></LuExternalLink>
          </Link>
        </Text>
      </footer>
    </Container>
  );
};

export default Footer;

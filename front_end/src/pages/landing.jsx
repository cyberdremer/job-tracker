import {
  Button,
  Flex,
  Heading,
  Container,
  Group,
  Text,
  HStack,
  VStack,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import InfoCards from "@/fragments/infocard";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        direction="column"
        gap="20"
        flexGrow="3"
        marginTop="4"
        animationName="fade-in"
        animationDuration="slowest"
      >
        <VStack alignItems="center" alignSelf="center" gap="10" flex="1">
          <Heading size="2xl">Job Tracking Made Simple.</Heading>
          <Heading size="5xl" textAlign="center">
            Track your job applications with <br></br> Job.Tracker!
          </Heading>
          <Text textAlign="center" >
            Job.Tracker helps you organize and monitor your job search with
            ease. <br></br>Effortlessly add, update, and visualize your job applications
            in one place. <br></br>Stay on top of your progress and let our AI assist you
            in managing application details.
          </Text>
          <Group>
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
            <Button onClick={() => navigate("/login")}>Log In</Button>
          </Group>
        </VStack>

        <SimpleGrid gap="10" alignSelf="center" marginBottom="10" columns={[2]}>
          <InfoCards
            description="Add your currently applied to jobs."
            title="Create 💡"
          ></InfoCards>
          <InfoCards
            description="Update the status of your applied to jobs"
            title="Update ♻️"
          ></InfoCards>
          <InfoCards
            title="Visualize 📊"
            description="Track your job search with charts and graphs that show how succsefull or not you've been!"
          ></InfoCards>
          <InfoCards
            title="AI 🤖"
            description="Don't feel like manually typing in information about the listing? Use our AI to fill in the pertinent information about the listing for you!"
          ></InfoCards>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Landing;

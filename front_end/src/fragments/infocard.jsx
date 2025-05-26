import { Card, Avatar } from "@chakra-ui/react";
const InfoCards = ({ title, description, image }) => {
  return (
    <Card.Root width="320px" minHeight="200px">
      <Card.Body gap="10">
        <Card.Title textAlign="center">{title}</Card.Title>
        <Card.Description textAlign="center">{description}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
};


export default InfoCards;
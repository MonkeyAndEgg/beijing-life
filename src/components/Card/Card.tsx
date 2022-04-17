import { Container } from "@chakra-ui/react";

const Card = (props) => {
  
  return (
    <Container border='1px solid #3182ce' borderRadius={5} p={0}>
      {props.children}
    </Container>
  );
};

export default Card;
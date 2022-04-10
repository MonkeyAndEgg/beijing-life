import { Button, VStack } from "@chakra-ui/react";

const Transaction = () => {

  return (
    <VStack w='250px' h='35vh' p={5} spacing={10} justify='center'>
      <Button colorScheme='blue'>买进</Button>
      <Button colorScheme='blue'>卖出</Button>
    </VStack>
  );
}

export default Transaction;
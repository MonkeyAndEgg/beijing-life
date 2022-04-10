import { Container, Flex, Stack, VStack, Image } from "@chakra-ui/react";
import ItemTable from "../src/components/ItemTable/ItemTable";
import Transaction from "../src/components/Transaction/Transaction";

const HomePage = () => {
  return (
    <Container maxW='container.lg' p={0}>
      <Stack h="15vh" direction='row'>
        <Image src='/images/dagongren.jpg' alt="早安,打工人"></Image>
      </Stack>
      <Flex h="35vh" padding={0} bgColor='red'>
        <VStack w='full' h='35vh' p={0} spacing={10} bgColor='yellow' alignItems='flex-start'>
          <ItemTable description='黑市'></ItemTable>
        </VStack>
       
        <Transaction></Transaction>

        <VStack w='full' h='35vh' p={0} spacing={10} bg='green' alignItems='flex-start'>
          <ItemTable description='您的出租屋'></ItemTable>
        </VStack>
      </Flex>
      <Flex h="50vh" py={0} bgColor='red'>
        <VStack w='full' h='400px' bgColor='pink'></VStack>
        <VStack w='full' h='400px' bgColor='purple'></VStack>
      </Flex>
    </Container>
  );
}

export default HomePage;
import { Container, Flex, Stack, Text, Image, Center  } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import { UserState } from "../redux/reducers/user";
import EventModal from "../src/components/EventModal/EventModal";
import ItemTable from "../src/components/ItemTable/ItemTable";
import Stations from "../src/components/Stations/Stations";
import Status from "../src/components/Status/Status";
import Transaction from "../src/components/Transaction/Transaction";
import TransactionModal from "../src/components/TransactionModal/TransactionModal";
import { EventProvider } from "../src/context/useEvent";
import { TransactionProvider } from "../src/context/useTransaction";

const HomePage = () => {
  const user: UserState = useSelector((state: RootState) => state.user);

  return (
    <TransactionProvider>
      <EventProvider>
        <Container maxW='container.lg' p={0}>
          <Stack h="15vh" direction='row' justifyContent='space-between'>
            <Image src='/images/dagongren.jpg' alt="早安,打工人"></Image>
            <Center>
              <Text>俺在北京的日子还剩{user.daysLeft}天</Text>
            </Center >
            <Image src='/images/dagongren-2.jpg' alt="加油,打工人"></Image>
          </Stack>
          <Flex h="35vh" padding={0}>
            <ItemTable description='黑市'></ItemTable>
            
            <Transaction></Transaction>

            <ItemTable isUser={true} description='您的出租屋'></ItemTable>
          </Flex>
          <Flex h="35vh" py={0}>
            <Status></Status>
            <Stations></Stations>
          </Flex>
        </Container>
        <TransactionModal></TransactionModal>
        <EventModal></EventModal>
      </EventProvider>
    </TransactionProvider>
  );
}

export default HomePage;
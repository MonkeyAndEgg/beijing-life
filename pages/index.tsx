import { Container, Flex, Stack, Text, Image, Center, VStack  } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import { UserState } from "../redux/reducers/user";
import EventModal from "../src/components/EventModal/EventModal";
import Footer from "../src/components/Footer/Footer";
import ItemTable from "../src/components/ItemTable/ItemTable";
import Stations from "../src/components/Stations/Stations";
import Status from "../src/components/Status/Status";
import Transaction from "../src/components/Transaction/Transaction";
import TransactionModal from "../src/components/TransactionModal/TransactionModal";
import { ReputationMap } from "../src/constants/reputation";
import { EventProvider } from "../src/context/useEvent";
import { TransactionProvider } from "../src/context/useTransaction";

const HomePage = () => {
  const user: UserState = useSelector((state: RootState) => state.user);

  return (
    <TransactionProvider>
      <EventProvider>
        <Container maxW='container.lg' p={0}>
          <Stack h="15vh" direction='row' justifyContent='space-between'>
            <Image src='/images/dagongren.jpg' alt="早安,打工人" />
            <VStack justifyContent='center'>
              <Text>俺在北京的日子还剩{user.daysLeft}天</Text>
              <Text>当前称号：{ ReputationMap.get(user.reputation) }</Text>
            </VStack >
            <Image src='/images/dagongren-2.jpg' alt="加油,打工人" />
          </Stack>
          <Flex h="35vh" padding={0}>
            <ItemTable description='黑市' />
            
            <Transaction />

            <ItemTable isUser={true} description='您的出租屋' />
          </Flex>
          <Flex h="40vh" py={0} mb="20px">
            <Status />
            <Stations />
          </Flex>

          <Footer />
        </Container>
        <TransactionModal />
        <EventModal />
      </EventProvider>
    </TransactionProvider>
  );
}

export default HomePage;
import { Container, Flex, Stack } from "@chakra-ui/react";
import EventModal from "../src/components/EventModal/EventModal";
import Footer from "../src/components/Footer/Footer";
import Header from "../src/components/Header/Header";
import InfoModal from "../src/components/InfoModal/InfoModal";
import ItemTable from "../src/components/ItemTable/ItemTable";
import Stations from "../src/components/Stations/Stations";
import Status from "../src/components/Status/Status";
import TransactionModal from "../src/components/TransactionModal/TransactionModal";
import { EventProvider } from "../src/context/useEvent";
import { InfoProvider } from "../src/context/useInfo";
import { TransactionProvider } from "../src/context/useTransaction";

const HomePage = () => {

  return (
    <TransactionProvider>
      <EventProvider>
        <InfoProvider>
          <Container maxW='container.lg' p={0}>
            <Header />
            <Stack h="35vh" padding={0} spacing="40px" direction="row">
              <ItemTable description='黑市' />
              <ItemTable isUser={true} description='您的出租屋' />
            </Stack>
            <Flex h="40vh" py={0} mb="20px">
              <Status />
              <Stations />
            </Flex>

            <Footer />
          </Container>
          <TransactionModal />
          <EventModal />
          <InfoModal />
        </InfoProvider>
      </EventProvider>
    </TransactionProvider>
  );
}

export default HomePage;
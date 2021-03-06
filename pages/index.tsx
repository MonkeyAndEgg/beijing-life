import { Container, Flex, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import { UserState } from "../redux/reducers/user";
import EventModal from "../src/components/EventModal/EventModal";
import Footer from "../src/components/Footer/Footer";
import Header from "../src/components/Header/Header";
import InfoModal from "../src/components/InfoModal/InfoModal";
import ItemTable from "../src/components/ItemTable/ItemTable";
import ScoreBoard from "../src/components/ScoreBoard/ScoreBoard";
import Stations from "../src/components/Stations/Stations";
import Status from "../src/components/Status/Status";
import TransactionModal from "../src/components/TransactionModal/TransactionModal";
import { EventProvider } from "../src/context/useEvent";
import { InfoProvider } from "../src/context/useInfo";
import { TransactionProvider } from "../src/context/useTransaction";

const HomePage = () => {
  const user: UserState = useSelector((state: RootState) => state.user);

  return (
    <TransactionProvider>
      <EventProvider>
        <InfoProvider>
          { user.daysLeft > 0 || user.health === 0 ? (
              <Container maxW='container.lg' px={5}>
                <Header />
                <Stack h={{ base: undefined, md: "35vh"}} padding={0} spacing={{ base: "5px", md: "40px" }} direction={{ base: "column", md: "row" }}>
                  <ItemTable description='黑市' />
                  <ItemTable isUser={true} description='您的出租屋' />
                </Stack>
                <Stack h={{ base: undefined, md: "40vh" }} py={0} mb="20px" direction={{ base: "column", md: "row" }}>
                  <Status />
                  <Stations />
                </Stack>

                <Footer />
              </Container>
            ) : (
              <ScoreBoard />
            )
          }
          <TransactionModal />
          <EventModal />
          <InfoModal />
        </InfoProvider>
      </EventProvider>
    </TransactionProvider>
  );
}

export default HomePage;
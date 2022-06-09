import { Stack } from "@chakra-ui/react";
import BankModal from "../BankModal/BankModal";
import Card from "../Card/Card";
import HospitalModal from "../HospitalModal/HospitalModal";
import NetModal from "../NetModal/NetModal";
import PostModal from "../PostModal/PostModal";
import RentModal from "../RentModal/RentModal";

const Footer = () => {

  return (
    <Card>
      <Stack direction={{ base: "column", md: "row" }} h={{ base: undefined, md: "7vh" }} p="15px" justifyContent="space-between">
        <BankModal />
        <HospitalModal />
        <PostModal />
        <RentModal />
        <NetModal />
      </Stack>
    </Card>
  );
};

export default Footer;
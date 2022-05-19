import { Button, Stack } from "@chakra-ui/react";
import { FaInternetExplorer } from "react-icons/fa";
import { GiHouse, GiPostOffice } from "react-icons/gi";
import BankModal from "../BankModal/BankModal";
import Card from "../Card/Card";
import HospitalModal from "../HospitalModal/HospitalModal";
import PostModal from "../PostModal/PostModal";

const Footer = () => {

  return (
    <Card>
      <Stack direction="row" h="7vh" p="15px" justifyContent="space-between">
        <BankModal />
        <HospitalModal />
        <PostModal />

        <Button leftIcon={<GiHouse />} colorScheme='blue' variant='outline'>
          租房中介
        </Button>

        <Button leftIcon={<FaInternetExplorer />} colorScheme='blue' variant='outline'>
          网吧
        </Button>
      </Stack>
    </Card>
  );
};

export default Footer;
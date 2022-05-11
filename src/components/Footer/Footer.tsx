import { Button, Stack } from "@chakra-ui/react";
import { BsBank2 } from "react-icons/bs";
import { FaInternetExplorer, FaRegHospital } from "react-icons/fa";
import { GiHouse, GiPostOffice } from "react-icons/gi";
import BankModal from "../BankModal/BankModal";
import Card from "../Card/Card";

const Footer = () => {

  return (
    <Card>
      <Stack direction="row" h="7vh" p="15px" justifyContent="space-between">
        <BankModal />

        <Button leftIcon={<FaRegHospital />} colorScheme='blue' variant='outline'>
          医院
        </Button>

        <Button leftIcon={<GiPostOffice />} colorScheme='blue' variant='outline'>
          邮局
        </Button>

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
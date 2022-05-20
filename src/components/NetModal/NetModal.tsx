import { Button, HStack, Modal, ModalBody, Image, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { FaInternetExplorer } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUserCash, setUserMaxNetCafeNum } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";
import { randomInteger } from "../../helper/util";

export default function NetModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [luckyCash, setLuckyCash] = useState(0);
  const user: UserState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const netHandler = () => {
    if (user.maxNetCafeNum > 0) {
      const randomCash = randomInteger(1, 10);
      setLuckyCash(randomCash);
      dispatch(setUserCash(user.cash + randomCash));
    }
    onOpen();
  };

  const onCloseHandler = () => {
    dispatch(setUserMaxNetCafeNum(user.maxNetCafeNum - 1));
    onClose();
  }

  return (
    <>
      <Button leftIcon={<FaInternetExplorer />} colorScheme='blue' variant='outline' onClick={netHandler}>
        网吧
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onCloseHandler}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>天哥网咖</ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          <ModalBody>
            <HStack justify='center' my={5}>
              <Image w={40} src="/images/net.jpg" alt="网吧小图片" />
            </HStack>
            {
              user.maxNetCafeNum > 0 ? (`感谢电信改革，可以免费上网！还挣了美国网络广告费${luckyCash}元，嘿嘿！`) :
              ('村长放出话来：你别总是在网吧鬼混，快去做正经买卖！')
            }
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button variant='outline' mr={3} onClick={onCloseHandler}>
              离开网吧
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
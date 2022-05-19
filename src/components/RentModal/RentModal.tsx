import { Button, HStack, Modal, Image, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, ModalFooter } from "@chakra-ui/react";
import { useMemo } from "react";
import { GiHouse } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setUserCash, setUserMaxCapacity } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";
import { randomInteger } from "../../helper/util";

export default function RentModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user: UserState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const rentPrice = useMemo(() => {
    const randomPrice = Math.floor(user.cash) * 0.5;
    return randomInteger(randomPrice, randomPrice + 5000);
  }, [user.cash]);

  const rentHandler = () => {
    const updatedCash = Math.floor(user.cash - rentPrice - randomInteger(1, 5000));
    dispatch(setUserCash(updatedCash))
    dispatch(setUserMaxCapacity(user.maxCapacity + 10));
    onClose();
  };
  
  return (
    <>
      <Button leftIcon={<GiHouse />} colorScheme='blue' variant='outline' onClick={onOpen}>
        租房中介
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>黑心租房小中介</ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          <ModalBody>
            <HStack justify='center' my={5}>
              <Image w={40} src="/images/agent.jpg" alt="还钱小图片" />
            </HStack>
            {user.cash < 30000 ? '您没有三万现金就想租房？一边凉快去！' : (
              `欢迎来到北京“扁子居”租房中介公司！我们的理念，免费看房，成交补款，童叟无欺，无耻无畏！想把生意做大？您现在的房子只能放${user.maxCapacity}个物品，太小啦！您花费${rentPrice}元，可以租能放110个物品的房子`
            )}
          </ModalBody>
          <ModalFooter justifyContent={ user.cash > 30000 ? "space-between" : "center" }>
            {
              user.cash > 30000 ? (
                <>
                 <Button variant='outline' mr={3} onClick={rentHandler}>
                  成交
                </Button>

                <Button variant='outline' mr={3} onClick={onClose}>
                  怕上当，下次吧
                </Button>
                </>
              ) : (
                <Button variant='outline' mr={3} onClick={onClose}>
                  莫欺少年穷！
                </Button>
              )
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
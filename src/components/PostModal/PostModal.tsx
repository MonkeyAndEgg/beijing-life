import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Image, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiPostOffice } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setUserCash, setUserDebt } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";

const PostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user: UserState = useSelector((state: RootState) => state.user);
  const [ maxDebtToPay, setMaxDebtToPay ] = useState(0);
  const [ amount, setAmount ] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const maxAmount = user.cash < user.debt ? user.cash : user.debt;
    setMaxDebtToPay(maxAmount); 
  }, [user.debt, user.cash, setMaxDebtToPay]);

  const debtHanlder = () => {
    const updatedDebt = Math.floor(user.debt - amount);
    const updatedCash = Math.floor(user.cash - amount);
    dispatch(setUserDebt(updatedDebt));
    dispatch(setUserCash(updatedCash));
    setAmount(0);
    onClose();
  };

  return (
    <>
      <Button leftIcon={<GiPostOffice />} colorScheme='blue' variant='outline' onClick={onOpen}>
        邮局
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>给村长还钱</ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          <ModalBody>
            <HStack justify='center' my={5}>
              <Image w={40} src="/images/debt.jpg" alt="还钱小图片" />
            </HStack>
            {`村长在电话中说：“铁牛，你欠俺${user.debt}元，快还！” 您还多少？`}
            <NumberInput value={amount} min={0} max={maxDebtToPay} my={5} onChange={(value) => setAmount(+value)} allowMouseWheel>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button variant='outline' mr={3} onClick={debtHanlder}>
              确定
            </Button>

            <Button variant='outline' mr={3} onClick={onClose}>
              缓几天吧
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
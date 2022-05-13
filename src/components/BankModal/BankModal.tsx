import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Image, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { useState } from "react";
import { BsBank2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setUserCash, setUserDeposit } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";

const BankModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isDeposit, setIsDeposit ] = useState(null);
  const [ amount, setAmount ] = useState(0);
  const user: UserState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const depositHandler = (isDeposit: boolean) => {
    setIsDeposit(isDeposit);
  };

  const transactionHandler = () => {
    let updatedCash: number;
    let updatedDeposit: number;
    if (isDeposit) {
      updatedCash = Math.floor(user.cash - amount);
      updatedDeposit = Math.floor(user.deposit + amount);
    } else {
      updatedCash = Math.floor(user.cash + amount);
      updatedDeposit = Math.floor(user.deposit - amount);
    }
    dispatch(setUserDeposit(updatedDeposit));
    dispatch(setUserCash(updatedCash))
    onCloseServiceModal();
  };

  const onCloseServiceModal = () => {
    setIsDeposit(null);
    setAmount(0);
    onClose();
  };
  
  return (
    <>
      <Button leftIcon={<BsBank2 />} colorScheme='blue' variant='outline' onClick={onOpen}>
        银行
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onCloseServiceModal}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>人民银行</ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          {
            isDeposit === null ? (
              <>
                <ModalBody>
                  <HStack justify='center' my={5}>
                    <Image w={40} src="/images/bank.jpg" alt="银行小图片" />
                  </HStack>
                {`客户您好！您当前的现金为￥${user.cash}。当前存款余额为￥${user.deposit}。请问您是要办理什么业务？`}
                </ModalBody>

                <ModalFooter justifyContent="space-between">
                  <Button variant='outline' mr={3} onClick={() => depositHandler(true)}>
                    存钱
                  </Button>
                  <Button variant='outline' mr={3} onClick={() => depositHandler(false)}>
                    取钱
                  </Button>
                  <Button variant='outline' mr={3} onClick={onClose}>
                    离开
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalBody>
                  <HStack justify='center' my={5}>
                    <Image w={40} src="/images/deposit.jpg" alt="存钱小图片" />
                  </HStack>
                  {isDeposit ? '您想存多少呢?' : '您想取多少呢?'}
                  <NumberInput value={amount} min={0} max={isDeposit ? user.cash : user.deposit} my={5} onChange={(value) => setAmount(+value)} allowMouseWheel>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </ModalBody>

                <ModalFooter justifyContent="space-between">
                  <Button variant='outline' mr={3} onClick={transactionHandler}>
                    确认交易
                  </Button>

                  <Button variant='outline' mr={3} onClick={onCloseServiceModal}>
                    取消交易
                  </Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
};

export default BankModal;
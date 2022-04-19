import {
  Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper,
  NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
  Image
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCash, setUserItems } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";
import { useTransaction } from "../../context/useTransaction";
import { Item } from "../../models/item";

const TransactionModal = () => {
  const { isOpen, isBuy, item: selectedItem, onClose } = useTransaction();
  const [ quantity, setQuantity ] = useState(0);
  const [ maxQuantity, setMaxQuantity ] = useState(0);
  const user: UserState= useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      const maxNum = isBuy ?
        Math.floor(user.cash / selectedItem.price) : user.items.find(item => item.name === selectedItem.name).quantity;
      setMaxQuantity(maxNum);
    }
  }, [isOpen, isBuy, user, selectedItem])

  const transactionHanlder = () => {
    if (quantity > 0) {
      const updateList = user.items;
      const index = updateList.findIndex(item => item.name === selectedItem.name);
      let remainingCash: number;
      if (isBuy) {
        if (index > -1) {
          const updateItem = updateList[index];
          updateItem.quantity += quantity;
          updateList[index] = updateItem;
        } else {
          updateList.push({
            ...selectedItem,
            quantity
          } as Item);
        }
        remainingCash = user.cash - selectedItem.price * quantity;
      } else {
        if (quantity === updateList[index].quantity) {
          updateList.splice(index, 1);
        } else {
          const updateItem = updateList[index];
          updateItem.quantity -= quantity;
          updateList[index] = updateItem;
        }
        remainingCash = user.cash + selectedItem.price * quantity;
      }

      dispatch(setUserItems(updateList));
      dispatch(setUserCash(remainingCash));
    }

    closeDialog();
  };

  const closeDialog = () => {
    // reset the states
    setQuantity(0);
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={closeDialog}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>交易</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        
        <ModalBody>
          <HStack justify='center' my={5}>
            <Image w={20} src='/images/stop.jpg' alt="我已经没钱了"></Image>
          </HStack>
          {isBuy ? '你想买多少呢?' : '你想卖多少呢?'}
          <NumberInput value={quantity} min={0} max={maxQuantity} my={5} onChange={(value) => setQuantity(+value)} allowMouseWheel>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={transactionHanlder}>
            确定
          </Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
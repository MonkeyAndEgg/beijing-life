import {
  Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper,
  NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
  Image
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCash, setUserCurrCapacity, setUserItems, setUserReputation } from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers/rootReducer";
import { BASE_PATH } from "../../constants/app";
import { businessEvents } from "../../constants/businessEvents";
import { useEvent } from "../../context/useEvent";
import { useTransaction } from "../../context/useTransaction";
import useSound from "../../hooks/useSound";
import { Item } from "../../models/item";

const TransactionModal = () => {
  const { isOpen, isBuy, item: selectedItem, onClose } = useTransaction();
  const [ quantity, setQuantity ] = useState(0);
  const [ maxQuantity, setMaxQuantity ] = useState(0);
  const { user, market }= useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { onOpen } = useEvent();
  const { playSound } = useSound();

  useEffect(() => {
    if (isOpen) {
      let maxNum: number;
      if (isBuy) {
        const availableToBuy = user.maxCapacity - user.currCapacity;
        const cashToBuy = Math.floor(user.cash / selectedItem.price);
        maxNum = cashToBuy > availableToBuy ? availableToBuy : cashToBuy;
      } else {
        maxNum = user.items.find(item => item.name === selectedItem.name).quantity;
      }
      setMaxQuantity(maxNum);
      setQuantity(maxNum);
    }
  }, [isOpen, isBuy, user, selectedItem])

  const transactionHanlder = () => {
    if (quantity > 0) {
      const updateList = user.items;
      const index = updateList.findIndex(item => item.name === selectedItem.name);
      let remainingCash = user.cash;
      if (isBuy) {
        if (index > -1) {
          const updateItem = updateList[index];
          const newPrice = Math.floor((updateItem.price * updateItem.quantity + selectedItem.price * quantity) / (updateItem.quantity + quantity));
          updateItem.quantity += quantity;
          updateItem.price = newPrice;
          updateList[index] = updateItem;
        } else {
          updateList.push({
            ...selectedItem,
            quantity
          } as Item);
        }
        remainingCash = user.cash - selectedItem.price * quantity;
        playSound(BASE_PATH + '/sound/buy.wav');
      } else {
        const targetMarketItem = market.items.find(item => item.name === selectedItem.name);
        if (targetMarketItem) {
          const targetMarketPrice = targetMarketItem.price;
          if (quantity === updateList[index].quantity) {
            updateList.splice(index, 1);
          } else {
            const updateItem = updateList[index];
            updateItem.quantity -= quantity;
            updateList[index] = updateItem;
          }
          remainingCash = user.cash + targetMarketPrice * quantity;
  
          if (selectedItem.reputation) {
            const targetEvent = businessEvents.find(event => event.type === selectedItem.name);
            let updatedReputation = user.reputation + selectedItem.reputation;
            if (updatedReputation > 100) {
              updatedReputation = 100;
            } else if (updatedReputation < 0) {
              updatedReputation = 0;
            }
            dispatch(setUserReputation(updatedReputation));
            onOpen([{ msg: `???${targetEvent.type}???????????????????????????????????????`, img: targetEvent.img }]);
          }
          playSound(BASE_PATH + '/sound/money.wav');
        } else {
          onOpen([{ msg: `???????????????????????????${selectedItem.name}?????????`, img: `${BASE_PATH}/images/reject.jpg` }]);
        }
      }
      
      const currentTotalStockNum = updateList.reduce((acc, item) => acc + item.quantity, 0);
      
      dispatch(setUserCurrCapacity(currentTotalStockNum));
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
        <ModalHeader>??????</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        
        <ModalBody>
          <HStack justify='center' my={5}>
            <Image w={20} src={`${BASE_PATH}/images/stop.jpg`} alt="??????????????????"></Image>
          </HStack>
          {isBuy ? '???????????????????' : '???????????????????'}
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
            ??????
          </Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            ??????
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
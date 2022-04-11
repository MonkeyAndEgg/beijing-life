import {
  Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper,
  NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
  Image
} from "@chakra-ui/react";
import { useTransaction } from "../../context/useTransaction";

const TransactionModal = () => {
  const { isOpen, onClose } = useTransaction();

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>交易</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        
        <ModalBody>
          <HStack justify='center' my={5}>
            <Image w={20} src='/images/stop.jpg' alt="早安,打工人"></Image>
          </HStack>
          你想买多少呢?
          <NumberInput defaultValue={0} min={0} max={999999} my={5}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
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
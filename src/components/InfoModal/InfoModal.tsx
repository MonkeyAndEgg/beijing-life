import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useInfo } from "../../context/useInfo";

export default function InfoModal() {
  const { isOpen, infoData, onClose } = useInfo();

  return (
    infoData && <Modal isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay></ModalOverlay>
    <ModalContent>
      <ModalHeader>{infoData.header ? infoData.header : '信息'}</ModalHeader>
      <ModalCloseButton></ModalCloseButton>

      <ModalBody>
        {infoData.content ? infoData.content : ''}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          {infoData.footer ? infoData.footer : '俺知道了'}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
}
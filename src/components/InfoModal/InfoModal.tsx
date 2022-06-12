import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Image } from "@chakra-ui/react";
import { BASE_PATH } from "../../constants/app";
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
        <HStack justify='center' my={5}>
          <Image w={40} src={BASE_PATH + infoData.img} alt="打工小图片"></Image>
        </HStack>
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
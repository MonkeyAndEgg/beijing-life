import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, HStack, Image } from "@chakra-ui/react";
import { useEvent } from "../../context/useEvent";

const EventModal = () => {
  const { isOpen, events, onClose } = useEvent();

  const closeDialog = () => {
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={closeDialog}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>事件</ModalHeader>
        <ModalCloseButton></ModalCloseButton>

        <ModalBody>
          {
            events.length > 0 && events.map(event =>
              <>
                <HStack justify='center' my={5}>
                  <Image w={20} src={event.img} alt="事件小图片"></Image>
                </HStack>
                {event.msg}
              </>
            )
          }
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
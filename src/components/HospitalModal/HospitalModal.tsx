import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Image, ModalFooter, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { FaRegHospital } from "react-icons/fa";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUserHealth } from "../../../redux/actions/user";

const HospitalModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user: UserState = useSelector((state: RootState) => state.user);
  const [ amount, setAmount ] = useState(100 - user.health);
  const [ maxQuantity, setMaxQuantity ] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const remainingHealing = Math.floor(100 - user.health);
    const affordableHealing = Math.floor(user.cash / 3500);
    const maxHealPoints = affordableHealing < remainingHealing ? affordableHealing : remainingHealing;
    setMaxQuantity(maxHealPoints); 
  }, [user.health, user.cash]);

  const heal = () => {
    const updatedHealth = user.health + amount;
    dispatch(setUserHealth(updatedHealth));
    onClose();
  };

  return (
    <>
      <Button leftIcon={<FaRegHospital />} colorScheme='blue' variant='outline' onClick={onOpen}>
        医院
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>医院</ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          {
            user.health !== 100 ? (
              <>
                <ModalBody>
                  <HStack justify='center' my={5}>
                    <Image w={40} src="/images/doctor.jpg" alt="治疗小图片" />
                  </HStack>
                  {`大夫高兴地拍着手：“您的健康点数是${user.health}，需要治疗的点数是${100 - user.health}。坚决抵制腐败！每个健康点数俺只收你￥3500红包。”。`}
                  <NumberInput value={amount} min={0} max={maxQuantity} my={5} onChange={(value) => setAmount(+value)} allowMouseWheel>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </ModalBody>

                <ModalFooter justifyContent="space-between">
                  <Button variant='outline' mr={3} onClick={heal}>
                    确认
                  </Button>

                  <Button variant='outline' mr={3} onClick={onClose}>
                    你太黑了！俺告你去！
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalBody>
                  <HStack justify='center' my={5}>
                    <Image w={40} src="/images/nurse.gif" alt="小护士图片" />
                  </HStack>
                  小护士笑眯眯地望着俺：“大哥！神经科这边挂号。”
                </ModalBody>

                <ModalFooter justifyContent="center">
                  <Button variant='outline' mr={3} onClick={onClose}>
                    俺还是回去吧
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

export default HospitalModal;
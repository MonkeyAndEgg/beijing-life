import { Icon, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineCar, GiCigarette, BiBookHeart, ImVideoCamera, GiBeerBottle, RiMarkupLine, MdPhoneIphone, MdOutlineSmartToy } from 'react-icons/all'
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import { useTransaction } from "../../context/useTransaction";
import { Item } from "../../models/item";
import Card from "../Card/Card";

const STOCK = [
  { id:'1', icon: GiCigarette, name: '进口香烟', price: 12 },
  { id:'2', icon: BiBookHeart, name: '上海小宝贝18禁', price: 135 },
  { id:'3', icon: ImVideoCamera, name: '盗版VCD, 游戏', price: 50 },
  { id:'4', icon: GiBeerBottle, name: '劣质白酒', price: 47 },
  { id:'5', icon: RiMarkupLine, name: '伪劣化妆品', price: 788 },
  { id:'6', icon: AiOutlineCar, name: '进口汽车', price: 156002 },
  { id:'7', icon: MdPhoneIphone, name: '水货手机', price: 1200 },
  { id:'8', icon: MdOutlineSmartToy, name: '进口玩具', price: 99 },
];

const ItemTable = (props) => {
  const { onOpen } = useTransaction();
  const [items, setItems] = useState([]);

  const itemHandler = (item: Item) => {
    onOpen(item, props.isUser);
  };
  const user = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    if (props.isUser) {
      setItems(user.items);
    } else {
      setItems(STOCK);
    }
  }, [props.isUser, user.items, setItems])

  return (
    <VStack w='full' h='35vh' p={0} spacing={10} alignItems='flex-start'>
      <Card>
        <TableContainer w='100%' h='32vh' overflowY='auto'>
          <Table variant='simple'>
            <TableCaption placement="top">{props.description}</TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>商品</Th>
                <Th>价格</Th>
                { props.isUser && <Th>仓库</Th> }
              </Tr>
            </Thead>
            <Tbody>
              {items && items.map((item: Item) => 
                <Tr key={item.id}  color='yellow.700' onClick={() => itemHandler(item)}>
                  <Td><Icon as={item.icon}></Icon></Td>
                  <Td>{item.name}</Td>
                  <Td>{item.price}</Td>
                  { props.isUser && <Td>{item.quantity}</Td>}
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </VStack>
  );
}

export default ItemTable;
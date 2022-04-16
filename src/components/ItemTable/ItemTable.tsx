import { Icon, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { MdCheckCircle } from 'react-icons/md'
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import { useTransaction } from "../../context/useTransaction";
import { Item } from "../../models/item";

const ItemTable = (props) => {
  const { isOpen, onOpen } = useTransaction();
  const [items, setItems] = useState([
    { id:'1', icon: MdCheckCircle, name: '进口香烟', price: 12 },
    { id:'2', icon: MdCheckCircle, name: '上海小宝贝18禁', price: 135 },
    { id:'3', icon: MdCheckCircle, name: '盗版VCD, 游戏', price: 50 },
    { id:'4', icon: MdCheckCircle, name: '劣质白酒', price: 47 },
    { id:'5', icon: MdCheckCircle, name: '伪劣化妆品', price: 788 },
    { id:'6', icon: MdCheckCircle, name: '进口汽车', price: 156002 },
    { id:'7', icon: MdCheckCircle, name: '假白酒', price: 220 }
  ]);

  const itemHandler = (item: { id: string, icon: IconType, name: string, price: number}) => {
    onOpen();
  };
  const user = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    if (props.isUser) {
      setItems(user.items);
    }
  }, [props.isUser, user.items, setItems])

  return (
    <TableContainer w='100%' h='32vh' overflowY='auto' border='1px solid #3182ce' borderRadius={5}>
      <Table variant='simple' size='sm'>
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
            <Tr key={item.id} onClick={() => itemHandler(item)}>
              <Td><Icon as={item.icon}></Icon></Td>
              <Td>{item.name}</Td>
              <Td>{item.price}</Td>
              { props.isUser && <Td>{item.quantity}</Td>}
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ItemTable;
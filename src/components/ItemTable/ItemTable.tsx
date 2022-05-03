import { Icon, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import { useTransaction } from "../../context/useTransaction";
import { Item } from "../../models/item";
import Card from "../Card/Card";

const ItemTable = (props) => {
  const { onOpen } = useTransaction();
  const [items, setItems] = useState([]);

  const itemHandler = (item: Item) => {
    onOpen(item, props.isUser);
  };
  const state = useSelector((state: RootState) => state);
  
  useEffect(() => {
    if (props.isUser) {
      setItems(state.user.items);
    } else {
      setItems(state.market.items);
    }
  }, [state.market.items, props.isUser, state.user.items, setItems])

  return (
    <VStack w='full' h='35vh' p={0} alignItems='flex-start'>
      <Card>
        <TableContainer w='100%' h='32vh' overflowY='auto'>
          <Table variant='simple'>
            <TableCaption placement="top">{props.description}</TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>商品</Th>
                <Th>价格</Th>
                { props.isUser && <Th>仓库({state.user.currCapacity}/{state.user.maxCapacity})</Th> }
              </Tr>
            </Thead>
            <Tbody>
              {items && items.map((item: Item) => 
                <Tr key={item.id} cursor='pointer'  color='yellow.700' onClick={() => itemHandler(item)}>
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
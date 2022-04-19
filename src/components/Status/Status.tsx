import { Center, Code, List, ListIcon, ListItem, Stat, StatNumber, VStack } from "@chakra-ui/react";
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { GiPayMoney } from 'react-icons/gi';
import { BiCrown } from 'react-icons/bi';
import { RiMoneyCnyCircleLine } from 'react-icons/ri';
import { BsPiggyBank } from 'react-icons/bs';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";
import Card from "../Card/Card"

const Status = () => {
  const TEXT_GREEN = '#4CBB17';
  const TEXT_RED = '#FF3030';
  const user: UserState = useSelector((state: RootState) => state.user);

  return (
    <VStack w='25vw' h='35vh' marginRight={5}>
      <Card>
        <List h="35vh" spacing={3} p={5}>
          <Center fontWeight='bold'>当前状态</Center>
          <ListItem>
            <ListIcon as={RiMoneyCnyCircleLine} />
            现金余额
            <Stat color={TEXT_GREEN}>
              <StatNumber>￥{user.cash}</StatNumber>
            </Stat>
          </ListItem>
          <ListItem>
            <ListIcon as={BsPiggyBank} />
            银行存款
            <Stat color={TEXT_GREEN}>
              <StatNumber>￥{user.deposit}</StatNumber>
            </Stat>
          </ListItem>
          <ListItem>
            <ListIcon as={GiPayMoney} />
            当前负债
            <Stat color={TEXT_RED}>
              <StatNumber>￥{user.debt}</StatNumber>
            </Stat>
          </ListItem>
          <ListItem>
            <ListIcon as={MdOutlineHealthAndSafety} />
            生命值：<Code color={TEXT_GREEN}>{user.health}</Code>   
          </ListItem>
          <ListItem>
            <ListIcon as={BiCrown} />
            名声：<Code color={TEXT_GREEN}>{user.reputation}</Code> 
          </ListItem>
        </List>
      </Card>
    </VStack>
  );
}

export default Status;
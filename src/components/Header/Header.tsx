import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";
import { useInfo } from "../../context/useInfo";
import { InfoModalData } from "../../models/infoModalData";
import { Stack, Text, Image, VStack } from "@chakra-ui/react";
import { ReputationMap } from "../../constants/reputation";

export default function Header() {
  const user: UserState = useSelector((state: RootState) => state.user);
  const { onOpen } = useInfo();

  useEffect(() => {
    let infoData: InfoModalData;
  if (user.daysLeft === 40) {
      infoData = {
        header: '欢迎来到北京浮生记',
        content: `
          您扮演一位从外地到北京谋生的青年。一开始，您只有2000元钱，并且还欠村长（一个流氓头子）5500元债务。这些债务每天的利息高达10%。
          如果不及时还清，村长会叫在北京的老乡们来扁您，您可能牺牲在北京街头。您决定在北京各地铁口黑市倒卖各种物品来发财致富，不仅还掉债务，而且要荣登北京富人排行榜。\n

          您只能在北京呆40天，每次奔走一个黑市算一天。一开始，您租的房子只能放100个东西。您会在北京遭遇到各种事件，您需要与流氓，小偷，凶手，贪官，骗子等斗智斗勇，还需要在
          北京恶劣的自然环境下设法生存下来。
          \n
          您将体验在北京卖盗版VCD和走私汽车的刺激，以及我们这个时代才有的搞笑事件。
        `,
        footer: '开始游戏',
        img: '/images/work.jpg'
      };
    } else if (user.daysLeft === 1) {
      infoData = {
        header: '最后一天',
        content: '俺明天回老家，今天货物需要全部卖掉。',
        footer: '知道了',
        img: '/images/clean.jpg'
      };
    }
    onOpen(infoData);
  }, [user.daysLeft, onOpen]);

  return (
    <Stack h="15vh" direction='row' justifyContent='space-between'>
      <Image src='/images/dagongren.jpg' alt="早安,打工人" />
      <VStack justifyContent='center'>
        <Text>俺在北京的日子还剩{user.daysLeft}天</Text>
        <Text>当前称号：{ ReputationMap.get(user.reputation) }</Text>
      </VStack >
      <Image src='/images/dagongren-2.jpg' alt="加油,打工人" />
    </Stack>
  );
}
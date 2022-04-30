import { useDispatch, useSelector } from "react-redux";
import { setBusinessEvent } from "../../redux/actions/events";
import { setUserDaysLeft } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers/rootReducer";
import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from "../constants/stock";
import { useEvent } from "../context/useEvent";
import { randomInteger } from "../helper/util";
import { BusinessEvent } from "../models/businessEvent";

const businessEvents: BusinessEvent[] = [
  { event: '《北京真理报》社论：“提倡爱美，落到实处”，伪劣化妆品大受欢迎！', type: COSMETIC, isPriceUp: true, img: '/images/cosmetic.jpg' },
  { event: '谢不疯在晚会上说：“我酷！我使用伪劣化妆品！”，伪劣化妆品供不应求！', type: COSMETIC, isPriceUp: true, img: '/images/cosmetic.jpg' },
  { event: '《北京经济小报》社论：“走私汽车大力推进汽车消费！”', type: CAR, isPriceUp: true , img: '/images/car.jpg' },
  { event: '北京的孩子们都忙于上网学习，进口玩具没人愿意买。', type: TOY, isPriceUp: false, img: '/images/toy.jpg' },
  { event: '盗版业十分兴旺，“中国硅谷”——中关村全是卖盗版VCD的村姑！', type: CD, isPriceUp: false, img: '/images/cd.jpg' },
  { event: '8858.com也不敢卖《上海小宝贝》，黑市一册可卖天价！', type: PORN, isPriceUp: true, img: '/images/porn.jpg' },
  { event: '北京的学生们开始找工作，水货手机大受欢迎！', type: PHONES, isPriceUp: true, img: '/images/phones.jpg' },
  { event: '北京有人狂饮山西假酒，可以卖出天价！', type: ALCOHOL, isPriceUp: true, img: '/images/alcohol.jpg' },
  { event: '市场山充斥着来自福建的走私香烟', type: CIGARETTE, isPriceUp: false, img: '/images/cigar.jpg' },
];

const useNextDay = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { onOpen } = useEvent();

  const processNextDay = () => {
    const newBusinessEvent = businessEvents[randomInteger(0, 30)];
    if (newBusinessEvent) {
      onOpen({ msg: newBusinessEvent.event, img: newBusinessEvent.img });
    }
    dispatch(setBusinessEvent(newBusinessEvent ? newBusinessEvent : {} as BusinessEvent));
    const updatedDaysLeft = state.user.daysLeft - 1;
    dispatch(setUserDaysLeft(updatedDaysLeft));
  };

  return processNextDay;
};

export default useNextDay;
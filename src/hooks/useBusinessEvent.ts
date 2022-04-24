import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from "../constants/stock";

const businessEvents = [
  { event: '《北京真理报》社论：“提倡爱美，落到实处”，伪劣化妆品大受欢迎！', type: COSMETIC, isPriceUp: true },
  { event: '谢不疯在晚会上说：“我酷！我使用伪劣化妆品！”，伪劣化妆品供不应求！', type: COSMETIC, isPriceUp: true },
  { event: '《北京经济小报》社论：“走私汽车大力推进汽车消费！”', type: CAR, isPriceUp: true },
  { event: '北京的孩子们都忙于上网学习，进口玩具没人愿意买。', type: TOY, isPriceUp: false },
  { event: '盗版业十分兴旺，“中国硅谷”——中关村全是卖盗版VCD的村姑！', type: CD, isPriceUp: false },
  { event: '8858.com也不敢卖《上海小宝贝》，黑市一册可卖天价！', type: PORN, isPriceUp: true },
  { event: '北京的学生们开始找工作，水货手机大受欢迎！', type: PHONES, isPriceUp: true },
  { event: '北京有人狂饮山西假酒，可以卖出天价！', type: ALCOHOL, isPriceUp: true },
  { event: '市场山充斥着来自福建的走私香烟', type: CIGARETTE, isPriceUp: false },
];

const useBusinessEvent = () => {


  return;
};

export default useBusinessEvent;
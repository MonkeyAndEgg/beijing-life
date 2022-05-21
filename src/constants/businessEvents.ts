import { BusinessEvent } from "../models/businessEvent";
import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from "./stock";

export const businessEvents: BusinessEvent[] = [
  { event: '《北京真理报》社论：“提倡爱美，落到实处”，伪劣化妆品大受欢迎！', type: COSMETIC, isPriceUp: true, img: '/images/cosmetic.jpg' },
  { event: '谢不疯在晚会上说：“我酷！我使用伪劣化妆品！”，伪劣化妆品供不应求！', type: COSMETIC, isPriceUp: true, img: '/images/cosmetic.jpg' },
  { event: '《北京经济小报》社论：“走私汽车大力推进汽车消费！”', type: CAR, isPriceUp: true , img: '/images/car.jpg' },
  { event: '北京的孩子们都忙于上网学习，进口玩具没人愿意买。', type: TOY, isPriceUp: false, img: '/images/toy.jpg' },
  { event: '盗版业十分兴旺，“中国硅谷”——中关村全是卖盗版VCD的村姑！', type: CD, isPriceUp: false, img: '/images/cd.jpg' },
  { event: '8858.com也不敢卖《上海小宝贝》，黑市一册可卖天价！', type: PORN, isPriceUp: true, img: '/images/porn.jpg' },
  { event: '北京的学生们开始找工作，水货手机大受欢迎！', type: PHONES, isPriceUp: true, img: '/images/phone.jpg' },
  { event: '北京有人狂饮山西假酒，可以卖出天价！', type: ALCOHOL, isPriceUp: true, img: '/images/alcohol.jpg' },
  { event: '市场山充斥着来自福建的走私香烟', type: CIGARETTE, isPriceUp: false, img: '/images/cigar.jpg' },
  { event: '俺老乡回家前把一些山西假白酒给俺！', type: ALCOHOL, quantity: 7, img: '/images/alcohol.jpg' },
  { event: '厦门的老同学资助俺几辆走私汽车。', type: CAR, quantity: 2, img: '/images/car.jpg' },
  { event: '工商局扫荡后，俺在黑暗角落里发现了老乡丢失的进口香烟。', type: CIGARETTE, quantity: 6, img: '/images/cigar.jpg' },
  { event: '日本产品又出事故！日本人死不认帐，拒绝赔偿！村长把他的水货手机用高价强卖给俺。', type: PHONES, quantity: 3, debt: 5000, img: '/images/force.jpg' },
  { event: '专家提议提高大学生“动手素质”, 进口玩具大受欢迎。', type: TOY, isPriceUp: true, img: '/images/toy.jpg' },
  { event: '有人说：生病不用打针吃药，喝假白酒（剧毒）就可以!', type: ALCOHOL, isPriceUp: true, img: '/images/alcohol.jpg' },
  { event: '医院的秘密报告：“《上海小宝贝》功效甚过伟哥”!', type: PORN, isPriceUp: true, img: '/images/porn.jpg' },
  { event: '文盲说：“2000年诺贝尔文学奖？呸！不如盗版VCD港台片。”', type: CD, isPriceUp: true, img: '/images/cd.jpg' },
  { event: '北京的富人疯狂地购买走私汽车！', type: CAR, isPriceUp: true, img: '/images/car.jpg' }
];

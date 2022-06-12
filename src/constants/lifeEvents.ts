import { LifeEvent } from "../models/lifeEvent";
import { BASE_PATH } from "./app";

export const lifeEvents: LifeEvent[] = [
  { event: '附近胡同的一个小青年砸俺一砖头！俺的健康值少了5点', img: BASE_PATH + '/images/hit.jpg', lifePoints: -5, sound: BASE_PATH + '/sound/dog.wav' },
  { event: '大街的两个流氓打了俺！损失3点生命值。', img: BASE_PATH + '/images/socialmen.jpg', lifePoints: -3, sound: BASE_PATH + '/sound/hit1.wav' },
  { event: '俺在过街地道被人打了蒙棍，生命值大幅度下降。', img: BASE_PATH + '/images/hit2.jpg', lifePoints: -20, sound: BASE_PATH + '/sound/hit2.wav' },
  { event: '工商局的追俺超过三个胡同。', img: BASE_PATH + '/images/manager.jpg', lifePoints: -1, sound: BASE_PATH + '/sound/chase.wav' },
  { event: '北京拥挤的交通让俺心焦', img: BASE_PATH + '/images/traffic.jpg', lifePoints: -1, sound: BASE_PATH + '/sound/vomit.wav' },
  { event: '开小巴的打俺一耳光！', img: BASE_PATH + '/images/slap.jpg', lifePoints: -1, sound: BASE_PATH + '/sound/hit1.wav' },
  { event: '一群民工打了俺，损失10点生命值', img: BASE_PATH + '/images/slap.jpg', lifePoints: -10, sound: BASE_PATH + '/sound/kill.wav' },
  { event: '胡同的一个小青年砸俺一砖头', img: BASE_PATH + '/images/hit.jpg', lifePoints: -5, sound: BASE_PATH + '/sound/hit1.wav' },
  { event: '两个假保安用电棍电击俺！俺的健康值减少了3点', img: BASE_PATH + '/images/shock.jpg', lifePoints: -3, sound: BASE_PATH + '/sound/electric.wav' },
  { event: '北京臭黑的小河熏着我了，健康值少了1点', img: BASE_PATH + '/images/gross.jpg', lifePoints: -1, sound: BASE_PATH + '/sound/vomit.wav' },
  { event: '守自行车的王大婶嘲笑俺没北京户口，健康值少了1点', img: BASE_PATH + '/images/sad.jpg', lifePoints: -1, sound: BASE_PATH + '/sound/chase.wav' },
  { event: '北京高温40度，健康值少了1点', img: BASE_PATH + '/images/hot.jpg', lifePoints: -1, sound: BASE_PATH + '/sound/vomit.wav' },
  { event: '申奥又添新风景，北京来了沙尘暴，健康值少了1点', img: BASE_PATH + '/images/sand.jpg', lifePoints: -1, sound: BASE_PATH + '/sound/wind.wav' },
  { event: '俺欠钱太多，村长叫一群老乡揍了俺一顿！', img: BASE_PATH + '/images/slap.jpg', lifePoints: -10, sound: BASE_PATH + '/sound/kill.wav' }
];
import arrayShuffle from "array-shuffle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { MdPhoneIphone, MdOutlineSmartToy } from 'react-icons/md';
import { GiCigarette, GiBeerBottle } from 'react-icons/gi';
import { AiOutlineCar } from 'react-icons/ai';
import { BiBookHeart } from 'react-icons/bi';
import { ImVideoCamera } from 'react-icons/im';
import { RiMarkupLine } from 'react-icons/ri';
import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from '../constants/stock';
import { randomInteger, randomNumber } from "../helper/util";
import { StockMultiplierMap } from "../config/config";
import { BusinessEvent } from "../models/businessEvent";
import { businessEvents } from "../constants/businessEvents";
import { setBusinessEvent, setLifeEvent } from "../../redux/actions/events";
import { setMarketItems } from "../../redux/actions/market";
import { lifeEvents } from "../constants/lifeEvents";
import { setUserDaysLeft, setUserDebt, setUserHealth } from "../../redux/actions/user";
import { useCallback, useState } from "react";
import { EventModalData } from "../models/eventModalData";

const STOCK = [
  { id:'1', icon: GiCigarette, name: CIGARETTE, price: 200 },
  { id:'2', icon: BiBookHeart, name: PORN, price: 1500 },
  { id:'3', icon: ImVideoCamera, name: CD, price: 50 },
  { id:'4', icon: GiBeerBottle, name: ALCOHOL, price: 400, reputation: -10 },
  { id:'5', icon: RiMarkupLine, name: COSMETIC, price: 800 },
  { id:'6', icon: AiOutlineCar, name: CAR, price: 50000 },
  { id:'7', icon: MdPhoneIphone, name: PHONES, price: 1200 },
  { id:'8', icon: MdOutlineSmartToy, name: TOY, price: 500 },
];

const useRandomEvents = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const [ events, setEvents ] = useState([] as EventModalData[]);
  
  const generateRandomEvents = useCallback(() => {
    const eventList: EventModalData[] = [];
    const newStock = arrayShuffle(STOCK);
    const updatedStock = [];
    const numOfStocksToUpdate = randomInteger(4,6);
    for (let i = 0; i < numOfStocksToUpdate; i++) {
      const poppedItem = newStock.pop();
      const stockItemOnMap = StockMultiplierMap.get(poppedItem.name);
      const min = stockItemOnMap.min;
      const max = stockItemOnMap.max;
      const updatedItem = { ...poppedItem, price: Math.floor(poppedItem.price * randomNumber(min, max)) };
      updatedStock.push(updatedItem);
    }

    // random business event
    const randomIndex = randomInteger(0, 20);
    const randomItem = updatedStock[randomIndex];
    let newBusinessEvent: BusinessEvent;
    if (user.daysLeft < 40 && randomItem) {
      const newBusinessEvents = businessEvents.filter(event => event.type === randomItem.name);
      const shuffledList = arrayShuffle(newBusinessEvents);
      newBusinessEvent = shuffledList.pop();
      const newItem = { ...randomItem };
      const stockItemOnMap = StockMultiplierMap.get(newItem.name);
      newItem.price = newBusinessEvent.isPriceUp ? 
        Math.floor(newItem.price * stockItemOnMap.mad) : Math.floor(newItem.price * 0.1);
      updatedStock[randomIndex] = { ...newItem };
      
      eventList.push({ msg: newBusinessEvent.event, img: newBusinessEvent.img });
    }
    dispatch(setBusinessEvent(newBusinessEvent));
    dispatch(setMarketItems(updatedStock));

    // random life event
    const randomLifeEventIndex = randomInteger(0, 60);
    let randomLifeEvent = lifeEvents[randomLifeEventIndex];
    if (user.daysLeft < 40 && randomLifeEvent) {
      if (user.health < 60) {
        const randomHealingPoints = randomInteger(1, 100-user.health);
        const healingCost = Math.floor(randomHealingPoints * 3500);
        randomLifeEvent = { 
          event: `由于不注意身体，我被人发现昏迷在复兴门附近的女厕所里。好心的市民把我抬到医院，医生让我治疗2天。村长让人为我垫付了住院费用${healingCost}元`,
          img: '',
          lifePoints: randomHealingPoints
        };
        dispatch(setUserDebt(user.debt + healingCost));
        dispatch(setUserDaysLeft(user.daysLeft - 2));
      }

      eventList.push({ msg: randomLifeEvent.event, img: randomLifeEvent.img })
      const updatedHealth = user.health + randomLifeEvent.lifePoints;
      dispatch(setUserHealth(updatedHealth)); 
    }
    setEvents(eventList);
    dispatch(setLifeEvent(randomLifeEvent));
  }, [dispatch, user.daysLeft, user.debt, user.health]);

  return {
    events,
    generateRandomEvents
  };
};

export default useRandomEvents;
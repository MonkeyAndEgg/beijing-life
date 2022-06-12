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
import { setBusinessEvent, setLifeEvent, setMoneyEvent } from "../../redux/actions/events";
import { setMarketItems } from "../../redux/actions/market";
import { lifeEvents } from "../constants/lifeEvents";
import { setUserCash, setUserCurrCapacity, setUserDaysLeft, setUserDebt, setUserHealth, setUserItems } from "../../redux/actions/user";
import { useCallback, useState } from "react";
import { EventModalData } from "../models/eventModalData";
import { moneyEvents } from "../constants/moneyEvent";
import { Item } from "../models/item";
import useSound from "./useSound";
import { BASE_PATH } from "../constants/app";

const STOCK = [
  { id:'1', icon: GiCigarette, name: CIGARETTE, price: 200 },
  { id:'2', icon: BiBookHeart, name: PORN, price: 7500 },
  { id:'3', icon: ImVideoCamera, name: CD, price: 50 },
  { id:'4', icon: GiBeerBottle, name: ALCOHOL, price: 1500, reputation: -10 },
  { id:'5', icon: RiMarkupLine, name: COSMETIC, price: 500 },
  { id:'6', icon: AiOutlineCar, name: CAR, price: 20000 },
  { id:'7', icon: MdPhoneIphone, name: PHONES, price: 1000 },
  { id:'8', icon: MdOutlineSmartToy, name: TOY, price: 400 },
];

const useRandomEvents = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const [ events, setEvents ] = useState([] as EventModalData[]);
  const { playSound } = useSound();
  
  const generateRandomEvents = useCallback((cash?: number, daysLeft?: number) => {
    const eventList: EventModalData[] = [];
    const newStock = arrayShuffle(STOCK);
    const updatedStock = [];
    // display all stock for the last and the day before last day
    const numOfStocksToUpdate = daysLeft === 1 || daysLeft === 0 ? newStock.length : randomInteger(4,6);
    for (let i = 0; i < numOfStocksToUpdate; i++) {
      const poppedItem = newStock.pop();
      const stockItemOnMap = StockMultiplierMap.get(poppedItem.name);
      const min = stockItemOnMap.min;
      const max = stockItemOnMap.max;
      const updatedItem = { ...poppedItem, price: Math.floor(poppedItem.price * randomNumber(min, max)) };
      updatedStock.push(updatedItem);
    }

    // random business event
    const randomIndex = randomInteger(0, (updatedStock.length - 1) * 2);
    const randomItem = updatedStock[randomIndex];
    let newBusinessEvent: BusinessEvent;
    if (user.daysLeft < 40 && randomItem) {
      const newBusinessEvents = businessEvents.filter(event => event.type === randomItem.name);
      const shuffledList = arrayShuffle(newBusinessEvents);
      newBusinessEvent = shuffledList.pop();
      if (newBusinessEvent.quantity > 0) {
        let updatedItems = user.items;
        const existIndex = updatedItems.findIndex(item => item.name === newBusinessEvent.type);
        const existItem = updatedItems[existIndex];
        const targetStock = STOCK.find(stock => stock.name === newBusinessEvent.type);
        const luckyItemPrice = 0;
        const luckyQuantity = user.maxCapacity - user.currCapacity > newBusinessEvent.quantity ?
          newBusinessEvent.quantity : user.maxCapacity - user.currCapacity;
        if (existItem) {
          existItem.price = Math.floor(
            (existItem.price * existItem.quantity + luckyItemPrice * luckyQuantity) / (existItem.quantity + luckyQuantity)
          );
          existItem.quantity = existItem.quantity + luckyQuantity;
          updatedItems[existIndex] = existItem;
        } else {
          updatedItems.push({
            ...targetStock,
            quantity: newBusinessEvent.quantity,
            price: luckyItemPrice
          } as Item);
        }
        const currentTotalStockNum = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
      
        if (newBusinessEvent.debt) {
          dispatch(setUserDebt(Math.floor(user.debt + newBusinessEvent.debt)));
        }
        dispatch(setUserCurrCapacity(currentTotalStockNum));
        dispatch(setUserItems(updatedItems));
      } else {
        const newItem = { ...randomItem };
        newItem.price = Math.floor(newItem.price * newBusinessEvent.multiplier);
        updatedStock[randomIndex] = { ...newItem };
      }

      eventList.push({ msg: newBusinessEvent.event, img: newBusinessEvent.img });
    }
    dispatch(setBusinessEvent(newBusinessEvent));
    dispatch(setMarketItems(updatedStock));

    // random life event
    const randomLifeEventIndex = randomInteger(0, 60);
    let randomLifeEvent = lifeEvents[randomLifeEventIndex];
    if (user.daysLeft < 40 && randomLifeEvent) {
      if (user.health < 50) {
        const randomHealingPoints = randomInteger(1, 10);
        const healingCost = Math.floor(randomHealingPoints * 3500);
        randomLifeEvent = { 
          event: `由于不注意身体，我被人发现昏迷在复兴门附近的女厕所里。好心的市民把我抬到医院，医生让我治疗2天。村长让人为我垫付了住院费用${healingCost}元`,
          img: BASE_PATH + '/images/help.jpg',
          lifePoints: randomHealingPoints,
          sound: BASE_PATH + '/sound/motoaway.wav'
        };
        dispatch(setUserDebt(user.debt + healingCost));
        dispatch(setUserDaysLeft(user.daysLeft - 2));
      }
      eventList.push({ msg: randomLifeEvent.event, img: randomLifeEvent.img })
      const updatedHealth = user.health + randomLifeEvent.lifePoints;
      dispatch(setUserHealth(updatedHealth));
      playSound(randomLifeEvent.sound);
    }
    dispatch(setLifeEvent(randomLifeEvent));

    // random money event
    const randomMoneyEventIndex = randomInteger(0, 70);
    let randomMoneyEvent = moneyEvents[randomMoneyEventIndex];
    if (user.daysLeft < 40 && randomMoneyEvent) {
      const updatedCash = Math.floor(cash * (1 - randomMoneyEvent.percent));
      dispatch(setUserCash(updatedCash));
      eventList.push({ msg: randomMoneyEvent.event, img: randomMoneyEvent.img });
    }
    dispatch(setMoneyEvent(randomMoneyEvent));

    setEvents(eventList);
  }, [dispatch, user.daysLeft, user.debt, user.health]);

  return {
    events,
    generateRandomEvents
  };
};

export default useRandomEvents;
import arrayShuffle from "array-shuffle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDaysLeft, setUserDebt } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers/rootReducer";
import { DebtRate } from "../config/config";
import { useEvent } from "../context/useEvent";
import { MdPhoneIphone, MdOutlineSmartToy } from 'react-icons/md';
import { GiCigarette, GiBeerBottle } from 'react-icons/gi';
import { AiOutlineCar } from 'react-icons/ai';
import { BiBookHeart } from 'react-icons/bi';
import { ImVideoCamera } from 'react-icons/im';
import { RiMarkupLine } from 'react-icons/ri';
import { randomInteger, randomNumber } from '../helper/util';
import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from '../constants/stock';
import { StockMultiplierMap } from '../config/config';
import { setMarketItems } from '../../redux/actions/market';
import { businessEvents } from "../constants/businessEvents";
import { setBusinessEvent } from "../../redux/actions/events";

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

const useNextDay = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { onOpen } = useEvent();

  useEffect(() => {
    const newBusinessEvent = state.events.businessEvent;
    if (newBusinessEvent && newBusinessEvent.event) {
      onOpen({ msg: newBusinessEvent.event, img: newBusinessEvent.img });
    }
  }, [state.events.businessEvent, onOpen]);

  useEffect(() => {
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
    const randomIndex = randomInteger(0, 30);
    const randomItem = updatedStock[randomIndex];
    if (state.user.daysLeft < 40 && randomItem) {
      const newBusinessEvents = businessEvents.filter(event => event.type === randomItem.name);
      const shuffledList = arrayShuffle(newBusinessEvents);
      const newBusinessEvent = shuffledList.pop();
      const newItem = { ...randomItem };
      const stockItemOnMap = StockMultiplierMap.get(newItem.name);
      newItem.price = newBusinessEvent.isPriceUp ? 
        Math.floor(newItem.price * stockItemOnMap.mad) : Math.floor(newItem.price * 0.1);
      updatedStock[randomIndex] = { ...newItem };
      dispatch(setBusinessEvent(newBusinessEvent));
    }

    dispatch(setMarketItems(updatedStock));
  }, [dispatch, state.user.daysLeft]);

  const processNextDay = () => {
    const updatedDaysLeft = state.user.daysLeft - 1;
    dispatch(setUserDaysLeft(updatedDaysLeft));

    const updatedDebt = Math.floor(state.user.debt * (1 + DebtRate));
    dispatch(setUserDebt(updatedDebt));
  };

  return processNextDay;
};

export default useNextDay;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCash, setUserDaysLeft, setUserDebt, setUserDeposit, setUserItems } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers/rootReducer";
import { DebtRate, DepositRate } from "../config/config";
import { BASE_PATH } from "../constants/app";
import { useEvent } from "../context/useEvent";
import { Item } from "../models/item";
import useRandomEvents from "./useRandomEvents";
import useSound from "./useSound";

const useNextDay = () => {
  const dispatch = useDispatch();
  const { user, market } = useSelector((state: RootState) => state);
  const { onOpen } = useEvent();
  const { events: randomEvents, generateRandomEvents } = useRandomEvents();
  const { playSound } = useSound();

  useEffect(() => {
    if (user.daysLeft === 40 && market.items.length === 0) {
      generateRandomEvents();
    } else if (user.daysLeft === 0) {
      const currentItems: Item[] = user.items;
      let updatedCashAmount = 0;
      currentItems.forEach(userItem => {
        const targetItem = market.items.find(item => item.name === userItem.name);
        updatedCashAmount += Math.floor(targetItem.price * userItem.quantity);
      });

      // sold all stock
      dispatch(setUserCash(user.cash + updatedCashAmount));
      // clean the user stock
      dispatch(setUserItems([]));
    }
  }, [generateRandomEvents, user.daysLeft, user.cash, user.items, market.items, dispatch])

  useEffect(() => {
    if (user.debt > 0 &&  user.daysLeft < 40) {
      // update debt
      const updatedDebt = Math.floor(user.debt * (1 + DebtRate));
      dispatch(setUserDebt(updatedDebt));
    }
  }, [user.daysLeft]);

  useEffect(() => {
    if (randomEvents.length > 0) {
      onOpen(randomEvents);
    }
  }, [randomEvents, onOpen]);

  const processNextDay = () => {
    const updatedDaysLeft = user.daysLeft - 1;
    dispatch(setUserDaysLeft(updatedDaysLeft));

    generateRandomEvents(user.cash, updatedDaysLeft);

    // update deposit
    const updatedDeposit = Math.floor(user.deposit * (1 + DepositRate));
    dispatch(setUserDeposit(updatedDeposit));

    playSound(BASE_PATH + '/sound/nextStop.wav');
  };

  return processNextDay;
};

export default useNextDay;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCash, setUserDaysLeft, setUserDebt, setUserDeposit, setUserItems } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers/rootReducer";
import { DebtRate, DepositRate } from "../config/config";
import { useEvent } from "../context/useEvent";
import { Item } from "../models/item";
import useRandomEvents from "./useRandomEvents";

const useNextDay = () => {
  const dispatch = useDispatch();
  const { user, market } = useSelector((state: RootState) => state);
  const { onOpen } = useEvent();
  const { events: randomEvents, generateRandomEvents } = useRandomEvents();

  useEffect(() => {
    if (user.daysLeft === 40) {
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
    if (randomEvents.length > 0) {
      onOpen(randomEvents);
    }
  }, [randomEvents, onOpen]);

  const processNextDay = () => {
    generateRandomEvents(user.cash);

    const updatedDaysLeft = user.daysLeft - 1;
    dispatch(setUserDaysLeft(updatedDaysLeft));

    // update debt
    const updatedDebt = Math.floor(user.debt * (1 + DebtRate));
    dispatch(setUserDebt(updatedDebt));

    // update deposit
    const updatedDeposit = Math.floor(user.deposit * (1 + DepositRate));
    dispatch(setUserDeposit(updatedDeposit));
  };

  return processNextDay;
};

export default useNextDay;
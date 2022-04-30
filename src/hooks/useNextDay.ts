import { useDispatch, useSelector } from "react-redux";
import { setBusinessEvent } from "../../redux/actions/events";
import { setUserDaysLeft, setUserDebt } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers/rootReducer";
import { DebtRate } from "../config/config";
import { businessEvents } from "../constants/businessEvents";
import { useEvent } from "../context/useEvent";
import { randomInteger } from "../helper/util";
import { BusinessEvent } from "../models/businessEvent";

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

    const updatedDebt = Math.floor(state.user.debt * (1 + DebtRate));
    dispatch(setUserDebt(updatedDebt));
  };

  return processNextDay;
};

export default useNextDay;
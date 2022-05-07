import { BusinessEvent } from '../../src/models/businessEvent';
import { LifeEvent } from '../../src/models/lifeEvent';
import { MoneyEvent } from '../../src/models/moneyEvent';
import * as t from '../types';

export interface EventState {
  businessEvent: BusinessEvent;
  lifeEvent: LifeEvent;
  moneyEvent: MoneyEvent;
}

const initalState: EventState = {
  businessEvent: undefined,
  lifeEvent: undefined,
  moneyEvent: undefined
}

const events = (state = initalState, action) => {
  switch(action.type) {
    case t.SET_BUSINESS_EVENT:
      return {
        ...state,
        businessEvent: action.payload
      };
    case t.SET_LIFE_EVENT:
      return {
        ...state,
        lifeEvent: action.payload
      };
    case t.SET_MONEY_EVENT:
      return {
        ...state,
        money: action.payload
      };
    default:
      return { ...state };
  }
};

export default events;
import { BusinessEvent } from '../../src/models/businessEvent';
import { LifeEvent } from '../../src/models/lifeEvent';
import { MoneyEvent } from '../../src/models/moneyEvent';
import * as t from '../types';

export const setBusinessEvent = (businessEvent: BusinessEvent) => ({
  type: t.SET_BUSINESS_EVENT,
  payload: businessEvent
});

export const setLifeEvent = (lifeEvent: LifeEvent) => ({
  type: t.SET_LIFE_EVENT,
  payload: lifeEvent
});

export const setMoneyEvent = (moneyEvent: MoneyEvent) => ({
  type: t.SET_MONEY_EVENT,
  payload: moneyEvent
});

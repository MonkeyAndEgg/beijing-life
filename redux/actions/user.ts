import { Item } from '../../src/models/item';
import * as t from '../types';

export const setUserItems = (items: Item[]) => ({
  type: t.SET_USER_ITEMS,
  payload: items
});

export const setUserHealth = (health: number) => ({
  type: t.SET_USER_HEALTH,
  payload: health
});

export const setUserCash = (cash: number) => ({
  type: t.SET_USER_CASH,
  payload: cash
});

export const setUserDeposit = (deposit: number) => ({
  type: t.SET_USER_DEPOSIT,
  payload: deposit
});

export const setUserDebt = (debt: number) => ({
  type: t.SET_USER_DEBT,
  payload: debt
});

export const setUserDaysLeft = (daysLeft: number) => ({
  type: t.SET_USER_DAYS_LEFT,
  payload: daysLeft
});

export const setUserReputation = (reputation: number) => ({
  type: t.SET_USER_REPUTATION,
  payload: reputation
});

export const setUserMaxCapacity = (maxCapacity: number) => ({
  type: t.SET_USER_MAX_CAPACITY,
  payload: maxCapacity
});

export const setUserCurrCapacity = (currCapacity: number) => ({
  type: t.SET_USER_CURR_CAPACITY,
  payload: currCapacity
});

export const setUserMaxNetCafeNum = (maxNetCafeNum: number) => ({
  type: t.SET_USER_MAX_NET_CAFE_NUM,
  payload: maxNetCafeNum
});
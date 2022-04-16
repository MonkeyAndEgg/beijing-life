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
import { Item } from '../../src/models/item';
import * as t from '../types';

export interface UserState {
  health: number;
  cash: number;
  deposit: number;
  debt: number;
  items: Item[];
  daysLeft: number;
  reputation: number;
  currCapacity: number;
  maxCapacity: number;
  maxNetCafeNum: number;
}

const initalState: UserState = {
  health: 100,
  cash: 2000,
  deposit: 0,
  debt: 5500,
  items: [],
  daysLeft: 40,
  reputation: 100,
  currCapacity: 0,
  maxCapacity: 100,
  maxNetCafeNum: 3,
};

const user = (state = initalState, action) => {
  switch(action.type) {
    case t.SET_USER_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case t.SET_USER_HEALTH:
      return {
        ...state,
        health: action.payload
      };
    case t.SET_USER_CASH:
      return {
        ...state,
        cash: action.payload
      };
    case t.SET_USER_DEBT:
      return {
        ...state,
        debt: action.payload
      };
    case t.SET_USER_DAYS_LEFT:
      return {
        ...state,
        daysLeft: action.payload
      };
    case t.SET_USER_DEPOSIT:
      return {
        ...state,
        deposit: action.payload
      };
    case t.SET_USER_REPUTATION:
      return {
        ...state,
        reputation: action.payload
      };
    case t.SET_USER_MAX_CAPACITY:
      return {
        ...state,
        maxCapacity: action.payload
      };
    case t.SET_USER_CURR_CAPACITY:
      return {
        ...state,
        currCapacity: action.payload
      };
    case t.SET_USER_MAX_NET_CAFE_NUM:
      return {
        ...state,
        maxNetCafeNum: action.payload
      };
    default:
      return { ...state };
  }
}

export default user;
import { Item } from '../../src/models/item';
import * as t from '../types';

export interface UserState {
  health: number;
  cash: number;
  deposit: number;
  debt: number;
  items: Item[];
}

const initalState: UserState = {
  health: 100,
  cash: 2000,
  deposit: 0,
  debt: 0,
  items: []
};

const user = (state = initalState, action) => {
  switch(action.type) {
    case t.SET_USER_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return { ...state };
  }
}

export default user;
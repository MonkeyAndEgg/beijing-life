import { Item } from "../../src/models/item";
import * as t from '../types';

export interface MarketState {
  items: Item[]
}

const initalState: MarketState = {
  items: []
}

const market = (state = initalState, action) => {
  switch(action.type) {
    case t.SET_MARKET_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return { ...state };
  }
};

export default market;
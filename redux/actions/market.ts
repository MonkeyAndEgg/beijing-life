import { Item } from "../../src/models/item";
import * as t from '../types';

export const setMarketItems = (items: Item[]) => ({
  type: t.SET_MARKET_ITEMS,
  payload: items
});

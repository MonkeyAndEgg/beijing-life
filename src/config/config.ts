import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from "../constants/stock";

export const StockMultiplierMap = new Map([
  [ COSMETIC, { min: 0.7, max: 4, mad: 10 } ],
  [ CIGARETTE, { min: 0.7, max: 4, mad: 10 } ],
  [ CAR, { min: 0.7, max: 1.5, mad: 3 } ],
  [ PHONES, { min: 0.7, max: 2, mad: 10 } ],
  [ ALCOHOL, { min: 0.7, max: 1.8, mad: 10 } ],
  [ PORN, { min: 0.7, max: 1.8, mad: 10 } ],
  [ CD, { min: 0.7, max: 4, mad: 50 } ],
  [ TOY, { min: 0.7, max: 2, mad: 10 } ],
]);
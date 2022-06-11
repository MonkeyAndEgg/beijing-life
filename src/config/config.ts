import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from "../constants/stock";

export const StockMultiplierMap = new Map([
  [ COSMETIC, { min: 0.7, max: 1.5 } ],
  [ CIGARETTE, { min: 0.7, max: 1.5 } ],
  [ CAR, { min: 0.7, max: 1.5 } ],
  [ PHONES, { min: 0.7, max: 1.5 } ],
  [ ALCOHOL, { min: 0.7, max: 1.5 } ],
  [ PORN, { min: 0.7, max: 1.5 } ],
  [ CD, { min: 0.7, max: 1.5 } ],
  [ TOY, { min: 0.7, max: 1.5 } ],
]);

// the rate that charges each day on debt
export const DebtRate = 0.1;

// the rate that earn daily on bank deposit
export const DepositRate = 0.01;
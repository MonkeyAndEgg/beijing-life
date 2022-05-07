import { BasicEvent } from "./basicEvent";

export interface MoneyEvent extends BasicEvent {
  percent: number;
}
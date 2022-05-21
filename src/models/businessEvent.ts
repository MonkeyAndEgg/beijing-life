import { BasicEvent } from "./basicEvent";

export interface BusinessEvent extends BasicEvent {
  type: string;
  isPriceUp?: boolean;
  debt?: number;
  quantity?: number;
}

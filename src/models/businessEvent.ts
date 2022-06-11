import { BasicEvent } from "./basicEvent";

export interface BusinessEvent extends BasicEvent {
  type: string;
  debt?: number;
  quantity?: number;
  multiplier?: number;
}

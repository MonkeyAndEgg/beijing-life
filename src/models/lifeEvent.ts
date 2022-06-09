import { BasicEvent } from "./basicEvent";

export interface LifeEvent extends BasicEvent {
  lifePoints: number;
  sound: string;
}
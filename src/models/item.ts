import { IconType } from "react-icons";

export interface Item {
  id: string;
  icon: IconType;
  name: string;
  price: number;
  quantity?: number;
  reputation?: number;
}
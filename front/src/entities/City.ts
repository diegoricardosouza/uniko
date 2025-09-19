import { Neighborhood } from "./Neighborhood";
import { State } from "./State";

export interface City {
  id: string;
  name: string;
  slug?: string;
  createdAt?: string;
  state?: State;
  neighborhoods?: Neighborhood[]
}
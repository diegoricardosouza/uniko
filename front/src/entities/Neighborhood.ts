import { City } from "./City";

export interface Neighborhood {
  id: string;
  name: string;
  slug?: string;
  createdAt?: string;
  city?: City;
}
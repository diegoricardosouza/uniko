import { Medias } from "./Medias";

export interface Page {
  id: string;
  name: string;
  content?: string;
  featuredImage: string | File;
  medias?: Medias[];
  createdAt?: string;
}
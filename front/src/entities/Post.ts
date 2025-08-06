import { Medias } from "./Medias";

export interface CategoryPostsCat {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  createdAt?: string;
}

export interface Post {
  id: string;
  name: string;
  subtitle?: string;
  featuredImage: string | File;
  content?: string;
  categoryIds?: string[];
  categories?: CategoryPostsCat[];
  medias?: Medias[];
  createdAt?: string;
}
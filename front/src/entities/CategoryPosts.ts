import { Post } from "./Post";

export interface CategoryPosts {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  posts?: Post[];
}
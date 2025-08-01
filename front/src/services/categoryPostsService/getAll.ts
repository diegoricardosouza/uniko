
import { CategoryPosts } from "@/entities/CategoryPosts";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<CategoryPosts[]>('/category-posts');

  return data;
}
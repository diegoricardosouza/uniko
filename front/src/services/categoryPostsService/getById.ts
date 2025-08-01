import { CategoryPosts } from "@/entities/CategoryPosts";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<CategoryPosts>(`/category-posts/${id}`);

  return data;
}
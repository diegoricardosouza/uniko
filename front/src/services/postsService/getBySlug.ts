import { Post } from "@/entities/Post";
import { httpClient } from "../httpClient";

export async function getBySlug(slug: string) {
  const { data } = await httpClient.get<Post>(`/posts/slug/${slug}`);

  return data;
}
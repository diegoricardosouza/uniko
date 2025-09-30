import { Post } from "@/entities/Post";
import { httpClient } from "../httpClient";

export async function getRelated(id: string, limit: number = 3) {
  const { data } = await httpClient.get<Post[]>(`/posts/related/${id}`, {
    params: { limit }
  });

  return data;
}
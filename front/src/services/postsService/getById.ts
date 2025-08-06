import { Post } from "@/entities/Post";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Post>(`/posts/${id}`);

  return data;
}
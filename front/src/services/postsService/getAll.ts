
import { Post } from "@/entities/Post";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<Post[]>('/posts');

  return data;
}
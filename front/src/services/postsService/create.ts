import { httpClient } from "../httpClient";

export interface PostsParams {
  name: string;
  subtitle?: string;
  content?: string;
  featuredImage: string | File | undefined;
  categoryIds?: string[];
}

export async function create(params: PostsParams) {
  const formData = new FormData();

  formData.append("name", params.name);
  if (params.subtitle) formData.append("subtitle", params.subtitle);
  if (params.content) formData.append("content", params.content);
  if (params.featuredImage) formData.append("featuredImage", params.featuredImage);
  if (params.categoryIds) {
    formData.append("categoryIds", JSON.stringify(params.categoryIds));
  }

  const { data } = await httpClient.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
import { httpClient } from "../httpClient";

export interface PagesParams {
  name: string;
  content?: string;
  featuredImage: string | File | undefined;
}

export async function create(params: PagesParams) {
  const formData = new FormData();

  formData.append("name", params.name);
  if (params.content) formData.append("content", params.content);
  if (params.featuredImage) formData.append("featuredImage", params.featuredImage);

  const { data } = await httpClient.post("/pages", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
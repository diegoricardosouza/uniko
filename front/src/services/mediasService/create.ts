import { AxiosProgressEvent } from "axios";
import { httpClient } from "../httpClient";

export interface MediasParams {
  entityType: string;
  entityId?: string;
  mediaType: string;
  alt?: string;
  title?: string;
  description?: string;
  order?: string;
  isActive?: string;
}

export async function create(file: File, params: MediasParams, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) {
  const formData = new FormData();
  formData.append('file', file);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  }

  const { data } = await httpClient.post('/medias', formData, { 
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });

  return data;
}
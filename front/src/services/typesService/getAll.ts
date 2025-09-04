import { Type } from "@/entities/Type";
import { AxiosError } from 'axios';
import { httpClient } from "../httpClient";

export async function getAll() {
  try {
    const { data } = await httpClient.get<Type[]>('/types');

    return data;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 403) {
      // Retorne null ou [] e trate na page
      return null;
    }

    throw error;
  }
}
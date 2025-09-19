import { httpClient } from "../httpClient";

export interface UpdatePropertiesParams {
  id: string;
  title: string;
  description?: string;
  reference: string;
  price: number;
  priceCondominium?: number;
  priceIptu?: number;
  delivery?: string;
  totalArea?: number;
  privateArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  address?: string;
  number?: string;
  complement?: string;
  zipCode?: string;
  cityId: string;
  neighborhoodId: string;
  typeIds: string[];
  finalityIds: string[];
  characteristic?: string[];
  infrastructure?: string[];
  featuredImage: string | File | undefined;
  gallery?: string[] | File[] | undefined | null;
}

export async function update(id: string, formData: FormData) {
  const { data } = await httpClient.patch(`/properties/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}
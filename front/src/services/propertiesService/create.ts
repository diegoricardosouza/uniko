/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "../httpClient";

export interface PropertiesParams {
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

export async function create(params: PropertiesParams) {
  const formData = new FormData();

  formData.append("title", params.title);
  formData.append("reference", params.reference);
  formData.append("price", params.price.toString());
  formData.append("cityId", params.cityId);
  formData.append("neighborhoodId", params.neighborhoodId);
  formData.append("typeIds", JSON.stringify(params.typeIds));
  formData.append("finalityIds", JSON.stringify(params.finalityIds));
  if (params.description) formData.append("description", params.description);
  if (params.priceCondominium) formData.append("priceCondominium", params.priceCondominium.toString());
  if (params.priceIptu) formData.append("priceIptu", params.priceIptu.toString());
  if (params.delivery) formData.append("delivery", params.delivery);
  if (params.totalArea) formData.append("totalArea", params.totalArea.toString());
  if (params.privateArea) formData.append("privateArea", params.privateArea.toString());
  if (params.bedrooms) formData.append("bedrooms", params.bedrooms.toString());
  if (params.bathrooms) formData.append("bathrooms", params.bathrooms.toString());
  if (params.parkingSpaces) formData.append("parkingSpaces", params.parkingSpaces.toString());
  if (params.address) formData.append("address", params.address);
  if (params.number) formData.append("number", params.number);
  if (params.complement) formData.append("complement", params.complement);
  if (params.zipCode) formData.append("zipCode", params.zipCode);
  if (params.featuredImage) formData.append("featuredImage", params.featuredImage);
  if (params.gallery && params.gallery.length > 0) {
    params.gallery.forEach((file: any) => {
      formData.append("gallery", file.file);
    });
  }

  if (params.characteristic) {
    formData.append("characteristic", JSON.stringify(params.characteristic));
  }
  if (params.infrastructure) {
    formData.append("infrastructure", JSON.stringify(params.infrastructure));
  }

  const { data } = await httpClient.post("/properties", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
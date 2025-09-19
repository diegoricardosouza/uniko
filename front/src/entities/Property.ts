import { Medias } from "./Medias";

export type TypesProps = {
  id: string;
  name: string;
  slug: string;
}

export type FinalitiesProps = {
  id: string;
  name: string;
  slug: string;
}

export type CharacteristicsProps = {
  id: string;
  name: string;
}

export type InfrastructuresProps = {
  id: string;
  name: string;
}

export type StateProps = {
  id: string;
  name: string;
  slug: string;
  acronym: string;
}

export type CityProps = {
  id: string;
  name: string;
  slug: string;
  state: StateProps;
}

export type NeighborhoodProps = {
  id: string;
  name: string;
  slug: string;
}

export interface Property {
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
  types?: TypesProps[] | null;
  finalities?: FinalitiesProps[] | null;
  characteristics?: CharacteristicsProps[] | null;
  infrastructures?: InfrastructuresProps[] | null;
  city?: CityProps;
  neighborhood?: NeighborhoodProps;
  medias?: Medias[];
  createdAt?: string;
  updatedAt?: string;
}
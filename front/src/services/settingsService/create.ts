import { SocialMediaProps, UnitCompanyProps } from "@/entities/Setting";
import { httpClient } from "../httpClient";

export interface SettingsParams {
  titleSeo?: string;
  descriptionSeo?: string;
  unitCompany?: UnitCompanyProps[];
  socialMedia?: SocialMediaProps[];
}

export async function create(params: SettingsParams) {
  const { data } = await httpClient.post('/settings', params);

  return data;
}
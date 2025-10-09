import { IconSpec } from "@/app/(dashboard)/dashboard/settings/_components/SocialIcon";

export type UnitCompanyProps = {
  id?: string;
  name?: string;
  email?: string;
  telephone?: string;
  cellphone?: string;
  service?: string;
  address?: string;
}

export type SocialMediaProps = {
  name?: string;
  url?: string;
  icon?: IconSpec | string;
  iconJson?: Record<string, unknown>;
}

export interface Setting {
  id: string;
  titleSeo?: string;
  descriptionSeo?: string;
  urlYoutube?: string;
  unitCompany?: UnitCompanyProps[];
  socialMedia?: SocialMediaProps[];
}
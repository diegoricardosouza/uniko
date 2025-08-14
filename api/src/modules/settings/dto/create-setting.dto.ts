import { IsArray, IsOptional, IsString } from "class-validator";

interface UnitCompanyProps {
  settingId?: string;
  name?: string;
  email?: string;
  telephone?: string;
  cellphone?: string;
  service?: string;
  address?: string;
}

interface SocialMediaProps {
  settingId?: string;
  name?: string;
  url?: string;
  icon?: string;
}

export class CreateSettingDto {
  @IsString()
  @IsOptional()
  titleSeo?: string;

  @IsString()
  @IsOptional()
  descriptionSeo?: string;

  @IsArray()
  @IsOptional()
  unitCompany?: UnitCompanyProps[];

  @IsArray()
  @IsOptional()
  socialMedia?: SocialMediaProps[];
}

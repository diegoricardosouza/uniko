import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryPostDto } from './create-category-post.dto';

export class UpdateCategoryPostDto extends PartialType(CreateCategoryPostDto) {}

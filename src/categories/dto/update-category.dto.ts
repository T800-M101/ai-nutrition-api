import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Fruits',
    description: 'Updated category name (optional, must remain unique if changed).',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Category name cannot be empty if provided' })
  @MaxLength(100, { message: 'Category name must be less than 100 characters' })
  name?: string;

  @ApiPropertyOptional({
    example: 'Plant-based foods that are sweet and rich in simple carbohydrates.',
    description: 'Updated description for the category (optional).',
  })
  @IsString()
  @IsOptional()
  description?: string;
}


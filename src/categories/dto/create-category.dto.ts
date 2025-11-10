import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Fruits',
    description: 'Unique name of the category (e.g., Fruits, Vegetables, Meats)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  @MaxLength(100, { message: 'Category name must be less than 100 characters' })
  name: string;

  @ApiProperty({
    example: 'Plant-based foods that are sweet and rich in simple carbohydrates.',
    description: 'A short description explaining what type of foods belong to this category.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

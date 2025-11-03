import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
  @ApiProperty({
    example: 'Chicken Breast',
    description: 'Name of the ingredient',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '100g of cooked skinless chicken breast',
    description: 'Optional description or portion detail',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 165,
    description: 'Calories per 100 grams (or default unit)',
  })
  @IsNumber()
  @IsNotEmpty()
  calories: number;

  @ApiProperty({
    example: 31,
    description: 'Protein in grams per 100 grams',
  })
  @IsNumber()
  @IsNotEmpty()
  protein: number;

  @ApiProperty({
    example: 0,
    description: 'Carbohydrates in grams per 100 grams',
  })
  @IsNumber()
  @IsNotEmpty()
  carbs: number;

  @ApiProperty({
    example: 3.6,
    description: 'Fat in grams per 100 grams',
  })
  @IsNumber()
  @IsNotEmpty()
  fats: number;
}

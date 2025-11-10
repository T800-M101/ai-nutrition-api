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
  caloriesPer100g: number;

  @ApiProperty({
    example: 31,
    description: 'Protein in grams per 100 grams',
  })
  @IsNumber()
  @IsNotEmpty()
  proteinPer100g: number;

  @ApiProperty({
    example: 0,
    description: 'Carbohydrates in grams per 100 grams',
  })
  @IsNumber()
  @IsNotEmpty()
  carbsPer100g: number;

  @ApiProperty({
    example: 3.6,
    description: 'Fat in grams per 100 grams',
  })
  @IsNumber()
  @IsNotEmpty()
  fatsPer100g: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class MealItemDto {
  @ApiProperty({ example: 'Chicken Breast', description: 'Ingredient name' })
  @IsString()
  @IsNotEmpty({ message: 'Ingredient name is required' })
  item: string;

  @ApiProperty({ example: 200, description: 'Quantity of the ingredient in grams' })
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1 gram' })
  quantity: number;

  @ApiProperty({ example: 165, description: 'Calories per 100g', required: false })
  @IsNumber()
  @IsOptional()
  calories?: number;

  @ApiProperty({ example: 31, description: 'Protein per 100g', required: false })
  @IsNumber()
  @IsOptional()
  protein?: number;

  @ApiProperty({ example: 0, description: 'Carbs per 100g', required: false })
  @IsNumber()
  @IsOptional()
  carbs?: number;

  @ApiProperty({ example: 3.6, description: 'Fats per 100g', required: false })
  @IsNumber()
  @IsOptional()
  fats: number;
}
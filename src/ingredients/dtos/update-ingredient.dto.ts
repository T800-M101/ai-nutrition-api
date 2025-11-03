import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateIngredientDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  caloriesPer100g?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  proteinPer100g?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  carbsPer100g?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fatsPer100g?: number;
}

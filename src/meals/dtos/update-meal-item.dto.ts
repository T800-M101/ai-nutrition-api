import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMealItemDto {
  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsNumber()
  id?: number; // Para items existentes

  @ApiProperty({ example: 'Chicken Breast' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: 150 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @ApiProperty({ required: false, example: 165 })
  @IsOptional()
  @IsNumber()
  calories?: number;

  @ApiProperty({ required: false, example: 31 })
  @IsOptional()
  @IsNumber()
  protein?: number;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @IsNumber()
  carbs?: number;

  @ApiProperty({ required: false, example: 3.6 })
  @IsOptional()
  @IsNumber()
  fats?: number;
}

export class UpdateMealDto {
  @ApiProperty({ required: false, example: 'Lunch' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    required: false, 
    type: [UpdateMealItemDto],
    description: 'Array de items de la comida. Si se proporciona, reemplazará todos los items existentes.'
  })
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateMealItemDto)
  items: UpdateMealItemDto[];
}
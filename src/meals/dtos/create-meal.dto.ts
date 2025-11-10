import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MealItemDto } from './meal-item.dto';

export class CreateMealDto {

@ApiProperty({ example: 'Lunch', description: 'Meal name' })
@IsString()
@IsNotEmpty()
name: string; 

@ApiProperty({
example: [{ name: 'Chicken Breast', quantity: 200 }, { name: 'Brown Rice', quantity: 150 }],
type: [MealItemDto],
})
@IsArray()
@ArrayMinSize(1, { message: 'Meal must have at least one item' })
@ValidateNested({ each: true })
@Type(() => MealItemDto)
items: MealItemDto[];

@ApiProperty({ example: '2025-11-03T12:00:00.000Z', required: false })
@IsDateString()
@IsOptional()
createdAt?: string;
}

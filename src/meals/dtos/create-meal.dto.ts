import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  Min,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';


class ItemDto {
  @ApiProperty({ example: 'Chicken Breast' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export class CreateMealDto {

  @ApiProperty({ example: 'Lunch', description: 'Meal name' })
  @IsString()
  @IsNotEmpty()
  name: string; 

 @ApiProperty({
  example: [
    { name: 'Chicken Breast', quantity: 200 },
    { name: 'Brown Rice', quantity: 150 },
  ],
  type: [ItemDto],
})
@IsArray()
@ArrayMinSize(1, { message: 'Meal must have at least one item' })
@ValidateNested({ each: true })
@Type(() => ItemDto)
items: ItemDto[];

@ApiProperty({ example: '2025-11-03T12:00:00.000Z', required: false })
@IsDateString()
@IsOptional()
createdAt?: string;
}

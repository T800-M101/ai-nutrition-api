import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MealItem } from './meal-item.dto';

export class MealResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Lunch' })
  @Expose()
  name: string;

  @ApiProperty({ type: [MealItem] })
  @Expose()
  @Type(() => MealItem)
  items: MealItem[];

  @ApiProperty({ example: 650 })
  @Expose()
  totalCalories: number;

  @ApiProperty({ example: 45 })
  @Expose()
  totalProtein: number;

  @ApiProperty({ example: 75 })
  @Expose()
  totalCarbs: number;

  @ApiProperty({ example: 15 })
  @Expose()
  totalFats: number;

  @ApiProperty({ example: '2024-01-15T12:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @Expose()
  userId: number;
}
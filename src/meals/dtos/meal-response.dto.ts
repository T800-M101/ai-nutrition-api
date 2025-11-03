import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


class MealItemResponse {
  @ApiProperty({ example: 'Chicken Breast' })
  @Expose()
  ingredientName: string;

  @ApiProperty({ example: 200 })
  @Expose()
  quantity: number;

  @ApiProperty({ example: 330 })
  @Expose()
  calories: number;

  @ApiProperty({ example: 62 })
  @Expose()
  protein: number;

  @ApiProperty({ example: 0 })
  @Expose()
  carbs: number;

  @ApiProperty({ example: 7 })
  @Expose()
  fats: number;
}

class MealUserDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'John Doe' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @Expose()
  email: string;
}

export class MealResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Lunch' })
  @Expose()
  name: string;

  @ApiProperty({ type: [MealItemResponse] })
  @Expose()
  @Type(() => MealItemResponse)
  items: MealItemResponse[];

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

  @ApiProperty({ type: MealUserDto })
  @Expose()
  @Type(() => MealUserDto)
  user: MealUserDto;
}
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class MealItem {
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
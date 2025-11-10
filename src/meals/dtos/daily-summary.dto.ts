import { ApiProperty } from '@nestjs/swagger';
import { MealResponseDto } from './meal-response.dto';
import { Expose } from 'class-transformer';



export class DailyTotalsDto {
  @ApiProperty({ example: 514.5 })
  @Expose()
  calories: number;

  @ApiProperty({ example: 66.05 })
  @Expose()
  protein: number;

  @ApiProperty({ example: 38.4 })
  @Expose()
  carbs: number;

  @ApiProperty({ example: 8.7 })
  @Expose()
  fats: number;
}

export class DailySummaryDto {
  @ApiProperty({
    example: '2025-11-05',
    description: 'Fecha de las comidas registradas'
  })
  @Expose()
  date: string;

  @ApiProperty({
    description: 'Listado de comidas del día',
    type: [MealResponseDto]
  })
  @Expose()
  meals: MealResponseDto[];

  @ApiProperty({
    description: 'Totales diarios de macronutrientes',
    type: DailyTotalsDto
  })
  @Expose()
  dailyTotals: DailyTotalsDto;
}
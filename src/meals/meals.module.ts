import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Meal } from './entities/meal.entity';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { MealItem } from './entities/meal-item.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal, MealItem, User]),
    IngredientsModule
  ],
  exports: [MealsService],
  providers: [MealsService],
  controllers: [MealsController],
})
export class MealsModule {}

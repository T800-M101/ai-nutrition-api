import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dtos/create-meal.dto';
import { User } from '../users/entities/user.entity';
import { Meal } from './entities/meal.entity';
import { MealItem } from './entities/meal-item.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { MealResponseDto } from './dtos/meal-response.dto';

@Injectable()
export class MealsService {
  private readonly logger = new Logger(MealsService.name);
  constructor(
    @InjectRepository(Meal) private mealsRepo: Repository<Meal>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(MealItem)
    private mealItemsRepo: Repository<MealItem>,
    private ingredientsService: IngredientsService,
  ) {}

async createMeal(email: string, dto: CreateMealDto): Promise<MealResponseDto | null> {
  this.logger.log('Searching user to create a new meal...');

  const user = await this.usersRepo.findOneBy({ email });
  if (!user) throw new NotFoundException('User not found');

  this.logger.log(`Creating a new meal for user ${user.email}`);
  const meal = this.mealsRepo.create({ name: dto.name, user });
  await this.mealsRepo.save(meal);

  for (const itemDto of dto.items) {
    let ingredient = await this.ingredientsService.findOneByName(itemDto.name);

    if (!ingredient) {
      // Create placeholder ingredient with 0 macros
      ingredient = await this.ingredientsService.createIngredient({
        name: itemDto.name,
        description: 'No description',
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      });
    }

    // Calculate macros based on quantity
    const factor = itemDto.quantity / 100; // macros are per 100g
    const mealItem = this.mealItemsRepo.create({
      ingredient,
      quantity: itemDto.quantity,
      calories: ingredient.caloriesPer100g * factor,
      protein: ingredient.proteinPer100g * factor,
      carbs: ingredient.carbsPer100g * factor,
      fats: ingredient.fatsPer100g * factor,
      meal,
    });
    await this.mealItemsRepo.save(mealItem);
  }

  this.logger.log(`Meal created for user ${user.email}`);

  const mealCreated = await this.mealsRepo.findOne({
    where: { id: meal.id },
    relations: ['items', 'items.ingredient', 'user'],
  });

  if (!mealCreated) return null;
   return this.toMealResponseDto(mealCreated);
}

private toMealResponseDto(meal: Meal): MealResponseDto  {
  // Calculate totals
  const totals = meal.items.reduce((acc, item) => ({
    calories: acc.calories + item.calories,
    protein: acc.protein + item.protein,
    carbs: acc.carbs + item.carbs,
    fats: acc.fats + item.fats,
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  return {
    id: meal.id,
    name: meal.name,
    items: meal.items.map(item => ({
      ingredientName: item.ingredient.name,
      quantity: item.quantity,
      calories: Number(item.calories.toFixed(2)),
      protein: Number(item.protein.toFixed(2)),
      carbs: Number(item.carbs.toFixed(2)),
      fats: Number(item.fats.toFixed(2)),
    })),
    totalCalories: Number(totals.calories.toFixed(2)),
    totalProtein: Number(totals.protein.toFixed(2)),
    totalCarbs: Number(totals.carbs.toFixed(2)),
    totalFats: Number(totals.fats.toFixed(2)),
    createdAt: meal.createdAt,
    user: {
      id: meal.user.id,
      name: meal.user.name, 
      email: meal.user.email,
    },
  };
}
}

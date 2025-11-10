import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateMealDto } from './dtos/create-meal.dto';
import { User } from '../users/entities/user.entity';
import { Meal } from './entities/meal.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { MealResponseDto } from './dtos/meal-response.dto';
import { DailySummaryDto } from './dtos/daily-summary.dto';
import { UpdateMealDto } from './dtos/update-meal-item.dto';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { MealItemDto } from './dtos/meal-item.dto';

@Injectable()
export class MealsService {
//   private readonly logger = new Logger(MealsService.name);
//   constructor(
//     @InjectRepository(Meal) private mealsRepo: Repository<Meal>,
//     @InjectRepository(User) private usersRepo: Repository<User>,
//     @InjectRepository(MealItemDto)
//     private mealItemsRepo: Repository<MealItemDto>,
//     private ingredientsService: IngredientsService,
//   ) {}

//   async createMeal(
//     userId: number,
//     dto: CreateMealDto,
//   ): Promise<MealResponseDto> {
//     const user = await this.findUserOrFail(userId);

//     this.logger.log(`Creating a new meal for user ${user.email}`);
//     const meal = this.mealsRepo.create({ name: dto.name, user });
//     await this.mealsRepo.save(meal);

//     for (const itemDto of dto.items) {
//       let ingredient = await this.ingredientsService.findOneByName(
//         itemDto.item,
//       );

//       if (!ingredient) {
//         // Create placeholder ingredient with 0 macros
//         ingredient = await this.ingredientsService.createIngredient({
//           name: itemDto.item,
//           description: 'No description',
//           caloriesPer100g: 0,
//           proteinPer100g: 0,
//           carbsPer100g: 0,
//           fatsPer100g: 0,
//         });
//       }

//       // Calculate macros based on quantity
//       const factor = itemDto.quantity / 100; // macros are per 100g
//       const mealItem = this.mealItemsRepo.create({
//         item: itemDto.item,
//         quantity: itemDto.quantity,
//         calories: ingredient.caloriesPer100g * factor,
//         protein: ingredient.proteinPer100g * factor,
//         carbs: ingredient.carbsPer100g * factor,
//         fats: ingredient.fatsPer100g * factor,
//       });
//       await this.mealItemsRepo.save(mealItem);
//     }

//     this.logger.log(
//       `Meal "${dto.name}" created successfully for user ${user.email}`,
//     );

//     // Load the complete meal with relations.
//     const completeMeal = await this.mealsRepo.findOne({
//       where: { id: meal.id },
//       relations: ['items', 'items.ingredient', 'user'],
//     });

//     if (!completeMeal)
//       throw new Error('Meal creation failed - meal not found after creation');

//     return this.toMealResponseDto(completeMeal);
//   }

//   private toMealResponseDto(completeMeal: Meal): MealResponseDto {
//     // Calculate totals
//     const totals = completeMeal.items.reduce(
//       (acc, item) => ({
//         calories: acc.calories + item.calories,
//         protein: acc.protein + item.protein,
//         carbs: acc.carbs + item.carbs,
//         fats: acc.fats + item.fats,
//       }),
//       { calories: 0, protein: 0, carbs: 0, fats: 0 },
//     );

//     return {
//       id: completeMeal.id,
//       name: completeMeal.name,
//       items: completeMeal.items.map((item) => ({
//         item: item.item.name,
//         quantity: item.quantity,
//         calories: Number(item.calories.toFixed(2)),
//         protein: Number(item.protein.toFixed(2)),
//         carbs: Number(item.carbs.toFixed(2)),
//         fats: Number(item.fats.toFixed(2)),
//       })),
//       totalCalories: Number(totals.calories.toFixed(2)),
//       totalProtein: Number(totals.protein.toFixed(2)),
//       totalCarbs: Number(totals.carbs.toFixed(2)),
//       totalFats: Number(totals.fats.toFixed(2)),
//       createdAt: completeMeal.createdAt,
//       userId: completeMeal.user.id,
//     };
//   }

//   async findMealsByUserId(userId: number): Promise<MealResponseDto[]> {
//     this.logger.log(`Fetching meals for user ID: ${userId}`);

//     const meals = await this.mealsRepo.find({
//       where: { user: { id: userId } },
//       relations: ['items', 'items.ingredient'],
//       order: { createdAt: 'DESC' },
//     });

//     if (!meals.length)
//       throw new NotFoundException(`No meals found for user ID: ${userId}`);

//     this.logger.log(`Meals Ffound for user ${userId}`);
//     return meals.map((meal) => this.toMealResponseDto(meal));
//   }

//   async findMealByName(
//     userId: number,
//     mealName: string,
//   ): Promise<MealResponseDto> {
//     this.logger.log(`Fetching "${mealName}" meal for user ID: ${userId}`);

//     const meal = await this.mealsRepo.findOne({
//       where: {
//         user: { id: userId },
//         name: mealName,
//       },
//       relations: ['items', 'items.ingredient', 'user'],
//     });

//     if (!meal) throw new NotFoundException(`No meal found for user ${userId}`);

//     return this.toMealResponseDto(meal);
//   }

//   async findMealsByDate(
//     userId: number,
//     date: string,
//   ): Promise<DailySummaryDto> {
//     this.logger.log(`Fetching all meals for user ${userId} and date: ${date}`);

//     const start = new Date(date + 'T00:00:00.000Z');
//     const end = new Date(date + 'T23:59:59.999Z');

//     const meals = await this.mealsRepo.find({
//       where: {
//         user: { id: userId },
//         createdAt: Between(start, end),
//       },
//       relations: ['items', 'items.ingredient'],
//       order: { createdAt: 'ASC' },
//     });

//     if (!meals.length)
//       throw new NotFoundException(
//         `Meals not found for user ${userId} and date ${date}`,
//       );

//     const mealDtos = meals.map((meal) => this.toMealResponseDto(meal));

//     const dailyTotals = mealDtos.reduce(
//       (totals, meal) => {
//         totals.calories += meal.totalCalories;
//         totals.protein += meal.totalProtein;
//         totals.carbs += meal.totalCarbs;
//         totals.fats += meal.totalFats;
//         return totals;
//       },
//       { calories: 0, protein: 0, carbs: 0, fats: 0 },
//     );

//     this.logger.log(`Meals found for user ${userId}`);
//     return {
//       date,
//       meals: mealDtos,
//       dailyTotals,
//     };
//   }

//   async updateMeal(
//     attrs: UpdateMealDto,
//     userId: number,
//   ): Promise<MealResponseDto> {
//     const user = await this.findUserOrFail(userId);
//     const meal = await this.findMealOrFail(userId, attrs.name);

//     this.logger.log(`Updating meal "${meal.name}" for user ${userId}`);

//     if (attrs.name && attrs.name !== meal.name) {
//       meal.name = attrs.name;
//     }

//     if (attrs.items) {
//       await this.replaceMealItems(meal, attrs.items);
//     }

//     const updatedMeal = await this.mealsRepo.save(meal);
//     const completeMeal = await this.reloadMeal(updatedMeal.id);

//     return this.toMealResponseDto(completeMeal);
//   }

//   private async findUserOrFail(userId: number): Promise<User> {
//     this.logger.log(`Searching user by id ${userId}`);

//     const user = await this.usersRepo.findOneBy({ id: userId });
//     if (!user) throw new NotFoundException('User not found');

//     this.logger.log('User found');
//     return user;
//   }

//   private async findMealOrFail(
//     userId: number,
//     mealName: string,
//   ): Promise<Meal> {
//     const meal = await this.mealsRepo.findOne({
//       where: { user: { id: userId }, name: mealName },
//       relations: ['items', 'items.ingredient', 'user'],
//     });
//     if (!meal) throw new NotFoundException(`Meal "${mealName}" not found`);
//     return meal;
//   }

//   private async replaceMealItems(
//     meal: Meal,
//     items: MealItemDto[],
//   ): Promise<void> {
//     await this.mealItemsRepo.delete({ meal: { id: meal.id } });

//     for (const itemDto of items) {
//       if (!itemDto.name?.trim()) {
//         throw new BadRequestException('Ingredient name is required');
//       }

//       const ingredient = await this.findOrCreateIngredient(itemDto);

//       const mealItem = this.mealItemsRepo.create({
//         meal: { id: meal.id },
//         ingredient: { id: ingredient.id },
//         quantity: itemDto.quantity ?? 0,
//         caloriesPer100g: itemDto.caloriesPer100g ?? ingredient.caloriesPer100g,
//         proteinPer100g: itemDto.proteinPer100g ?? ingredient.proteinPer100g,
//         carbsPer100g: itemDto.carbsPer100g ?? ingredient.carbsPer100g,
//         fatsPer100g: itemDto.fatsPer100g ?? ingredient.fatsPer100g,
//       });

//       await this.mealItemsRepo.save(mealItem);
//     }
//   }

//   private async findOrCreateIngredient(itemDto: MealItem): Promise<Ingredient> {
//     let ingredient = await this.ingredientsService.findOneByName(itemDto.name);
//     if (!ingredient) {
//       ingredient = await this.ingredientsService.createIngredient({
//         name: itemDto.name,
//         description: 'Automatically created ingredient',
//         caloriesPer100g: itemDto.caloriesPer100g ?? 0,
//         proteinPer100g: itemDto.proteinPer100g ?? 0,
//         carbsPer100g: itemDto.carbsPer100g ?? 0,
//         fatsPer100g: itemDto.fatsPer100g ?? 0,
//       });
//     }
//     return ingredient;
//   }

//   private async reloadMeal(mealId: number): Promise<Meal> {
//     const meal = await this.mealsRepo.findOne({
//       where: { id: mealId },
//       relations: ['items', 'items.ingredient', 'user'],
//     });
//     if (!meal) throw new Error('Meal not found after update');
//     return meal;
//   }
}

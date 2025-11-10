import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMealDto } from './dtos/create-meal.dto';
import { RequestWithUser } from '../interfaces/resquest-user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MealsService } from './meals.service';
import { DailySummaryDto } from './dtos/daily-summary.dto';
import { MealResponseDto } from './dtos/meal-response.dto';
import { UpdateMealDto } from './dtos/update-meal-item.dto';

@ApiTags('meals')
@Controller('meals')
@UseGuards(JwtAuthGuard)
export class MealsController {
//   private readonly logger = new Logger(MealsController.name);

//   constructor(private readonly mealsService: MealsService) {}

//   @Post()
//   @ApiBearerAuth()
//   @Serialize(MealResponseDto)
//   async createMeal(
//     @Body() body: CreateMealDto,
//     @Req() { user: { userId } }: RequestWithUser,
//   ): Promise<MealResponseDto> {
//     this.logger.log(
//       `POST /meals - Received create meal request for user ${userId}`,
//     );

//     this.logger.log('Successfully meal created.');
//     return this.mealsService.createMeal(userId, body);
//   }

//   @Get()
//   @ApiBearerAuth()
//   @Serialize(MealResponseDto)
//   async getUserMeals(
//     @Req() { user: { userId } }: RequestWithUser,
//   ): Promise<MealResponseDto[]> {
//     this.logger.log('GET /meals - Received get all user meals request');

//     const meals = await this.mealsService.findMealsByUserId(userId);
//     this.logger.log(
//       `Successfully retrieved ${meals.length} meals for user ${userId}`,
//     );

//     return meals;
//   }

//   @Get('/:name')
//   @ApiBearerAuth()
//   @Serialize(MealResponseDto)
//   async findMealByName(
//     @Param('name') mealName: string,
//     @Req() { user: { userId } }: RequestWithUser,
//   ): Promise<MealResponseDto> {
//     this.logger.log('GET /meals/:name - Received get user meal by name');

//     const meal = await this.mealsService.findMealByName(userId, mealName);
//     this.logger.log(`Successfully retrieved meal for user ${userId}`);

//     return meal;
//   }

//   @Get('/daily/:date')
//   @ApiBearerAuth()
//   @Serialize(DailySummaryDto)
//   async getDailySummary(
//     @Param('date') date: string,
//     @Req() { user: { userId } }: RequestWithUser,
//   ): Promise<DailySummaryDto> {
//     this.logger.log(
//       `GET /meals/${date} - Fetching daily summary for user ID: ${userId}`,
//     );

//     const meals = await this.mealsService.findMealsByDate(userId, date);

//     this.logger.log(`Returning daily summary for user ID: ${userId}`);

//     return meals;
//   }

//   @Patch()
//   @ApiBearerAuth()
//   @Serialize(MealResponseDto)
//   async updateMeal(
//     @Body() attrs: UpdateMealDto,
//     @Req() { user: { userId } }: RequestWithUser,
//   ): Promise<MealResponseDto> {
//     this.logger.log(
//       `PATCH /meals/${userId} - Updating meal for user ${userId}`,
//     );

//     return await this.mealsService.updateMeal(attrs, userId);
//   }
}

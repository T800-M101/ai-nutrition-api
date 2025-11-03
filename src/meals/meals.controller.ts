import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
//import { MealsService } from './meals.service';
import { CreateMealDto } from './dtos/create-meal.dto';
import { RequestWithUser } from '../interfaces/resquest-user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MealResponseDto } from './dtos/meal-response.dto';
import { MealsService } from './meals.service';
import { Meal } from './entities/meal.entity';

@ApiTags('meals')
@Controller('meals')
@Serialize(MealResponseDto)
@UseGuards(JwtAuthGuard)
export class MealsController {
  private readonly logger = new Logger(MealsController.name);

  constructor(private readonly mealsService: MealsService) {}

//   @Post('analysis')
//   @UseGuards(JwtAuthGuard)
//   async submitMeal(
//     @Req() req: RequestWithUser,
//     @Body() body: CreateMealDto & { acceptAI?: boolean },
//   ) {
//     const user = req.user;

//     const itemsArray: string[] = Array.isArray(body.items)
//       ? body.items
//       : JSON.parse(body.items);
//     const mealAnalysis = await this.mealsService.processMeal(
//       user.email,
//       itemsArray,
//       body.name,
//       body.acceptAI,
//     );

//     return mealAnalysis;
//   }

  @Post()
  @ApiBearerAuth()
  async createMeal(@Body() body: CreateMealDto, @Req() req: RequestWithUser): Promise<any> {
    this.logger.log('POST /meals/create - Received create meal request');

    const user = req.user;
    this.logger.log('Returning response for new meal created.');
    return this.mealsService.createMeal(user.email, body);
  }
}


//   @Get()
//   async getUserMeals(@Req() req: Request) {
//     const user = req.user;
//     return this.mealsService.findAllByUser(user.id);
//   }

//   @Get(':id')
//   async getMeal(@Param('id') id: number, @Req() req: Request) {
//     const user = req.user;
//     return this.mealsService.findById(id, user.id);
//   }

//   @Put(':id')
//   async updateMeal(
//     @Param('id') id: number,
//     @Body() body: UpdateMealDto,
//     @Req() req: Request,
//   ) {
//     const user = req.user;
//     return this.mealsService.updateMeal(id, user.id, body);
//   }

//   @Delete(':id')
//   async deleteMeal(@Param('id') id: number, @Req() req: Request) {
//     const user = req.user;
//     return this.mealsService.deleteMeal(id, user.id);

import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  private readonly logger = new Logger(IngredientsController.name);

  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createIngredient(@Body() body: CreateIngredientDto): Promise<Ingredient> {
   
    this.logger.log('POST /ingredients - Received create ingredient request');

    const ingredient = await this.ingredientsService.createIngredient(body);

    this.logger.log('Ingredient created successfully.');

    return ingredient;
  }

  @Get()
  async getAllIngredients(): Promise<Ingredient[]> {
    this.logger.log('GET /ingredients - Received get all ingredients request');

    const ingredientsList = this.ingredientsService.findAll();

    this.logger.log('Returning list of ingredients');
    return ingredientsList;
  }

 
  @Get(':id')
  async getIngredient(@Param('id') id: number): Promise<Ingredient> {
    this.logger.log(`GET /ingredients/id - Received get ingredient by id ${id} request`);

    const ingredient = await this.ingredientsService.findOneById(id);
    if (!ingredient) throw new NotFoundException('Ingredient not found');

    this.logger.log('Returnig ingredient by id');
    return ingredient;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateIngredient( @Param('id') id: number, @Body() body: UpdateIngredientDto): Promise<Ingredient> {
    this.logger.log(`PATCH /ingredients - Received update ingredient by id ${id} request`);

    const ingredient = this.ingredientsService.updateIngredient(id, body);

    this.logger.log('Ingredient updated successfully');
    return  ingredient;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteIngredient(@Param('id') id: number): Promise<{ message: string }> {
    this.logger.log(`DELETE /ingredients - Received DELETE ingredient by id ${id} request`);
    await this.ingredientsService.deleteIngredient(id);
    return { message: 'Ingredient deleted successfully' };
  }
}

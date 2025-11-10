import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  // private readonly logger = new Logger(IngredientsService.name);
  // constructor(
  //   @InjectRepository(Ingredient)
  //   private ingredientsRepo: Repository<Ingredient>,
  // ) {}

  // async createIngredient(dto: CreateIngredientDto): Promise<Ingredient> {
  //   this.logger.log('Checking if ingredient already exists...');
    
  //   const existingIngredient = await this.ingredientsRepo.findOne({
  //     where: { name: dto.name }
  //   });

  //   if (existingIngredient)throw new ConflictException(`Ingredient '${dto.name}' already exists in database`);
  

  //   this.logger.log('Creating new ingredient...');

  //   const ingredient = this.ingredientsRepo.create({
  //     name: dto.name,
  //     description: dto.description,
  //     caloriesPer100g: dto.caloriesPer100g,
  //     proteinPer100g: dto.proteinPer100g,
  //     carbsPer100g: dto.carbsPer100g,
  //     fatsPer100g: dto.fatsPer100g,
  //   });

  //   this.logger.log('New ingredient created.');

  //   return this.ingredientsRepo.save(ingredient);
  // }

  // async findAll(): Promise<Ingredient[]> {
  //   this.logger.log('Getting a list of all ingredients');

  //   const ingredientsList = this.ingredientsRepo.find();

  //   if (!ingredientsList) throw new NotFoundException('Ingredients not found');

  //   this.logger.log('List of ingredients found');
  //   return ingredientsList;
  // }

  // async findOneById(id: number): Promise<Ingredient | null> {
  //   this.logger.log(`Searching for ingredient by id ${id}`);

  //   const ingredient = this.ingredientsRepo.findOneBy({ id });

  //   if (!ingredient) throw new NotFoundException('Ingredient not found');

  //   this.logger.log('Ingredient found');

  //   return ingredient;
  // }

  // async updateIngredient(id: number, attrs: UpdateIngredientDto): Promise<Ingredient> {
  //   this.logger.log(`Updating ingredient by id ${id}`);

  //   const ingredient = await this.findOneById(id);

  //   if (!ingredient) throw new NotFoundException('Ingredient not found');

  //   Object.assign(ingredient, attrs);

  //   const ingredientUpdated =  this.ingredientsRepo.save(ingredient);

  //   this.logger.log('Ingredient updated successfully');
  //   return ingredientUpdated;
  // }

  // async deleteIngredient(id: number): Promise<void> {
  //   this.logger.log(`Deleting ingredient by id ${id}`);

  //   const result = await this.ingredientsRepo.delete(id);

  //   if (result.affected === 0) throw new NotFoundException(`Ingredient with id ${id} not found`);

  //   this.logger.log(`Ingredient ${id} deleted successfully`);
  // }

  // async findOneByName(name: string): Promise<Ingredient | null> {
  //   this.logger.log(`Searching ingredient by name ${name}`);

  //   const ingredient = await this.ingredientsRepo.findOneBy({ name });
  //   if (!ingredient) return null;

  //   this.logger.log('Ingredient found');
  //   return ingredient;
  // }
}

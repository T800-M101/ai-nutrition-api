import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Ingredient])],
  exports: [IngredientsService],
  controllers: [IngredientsController],
  providers: [IngredientsService]
})
export class IngredientsModule {}

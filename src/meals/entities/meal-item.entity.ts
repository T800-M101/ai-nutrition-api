import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meal } from './meal.entity';

@Entity('meal_items')
export class MealItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ingredient, { eager: true })
  ingredient: Ingredient;

  @Column('float')
  quantity: number; // in grams

  @Column('float')
  calories: number;

  @Column('float')
  protein: number;

  @Column('float')
  carbs: number;

  @Column('float')
  fats: number;

  @ManyToOne(() => Meal, (meal) => meal.items)
  meal: Meal;
}

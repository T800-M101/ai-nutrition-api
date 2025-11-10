import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meal } from './meal.entity';

@Entity('meal_items')
export class MealItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ingredient, { eager: true })
  item: Ingredient;

  @Column({ type: 'float', default: 0 })
  quantity: number; // in grams

  @Column({ type: 'float', default: 0 })
  calories: number;

  @Column({ type: 'float', default: 0 })
  protein: number;

  @Column({ type: 'float', default: 0 })
  carbs: number;

  @Column({ type: 'float', default: 0 })
  fats: number;

  @ManyToOne(() => Meal, (meal) => meal.items)
  meal: Meal;
}

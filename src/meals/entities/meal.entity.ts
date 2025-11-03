import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { MealItem } from './meal-item.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MealItem, (mealItem) => mealItem.meal, { cascade: true, eager: true })
  items: MealItem[];

  @ManyToOne(() => User, (user) => user.meals, { eager: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

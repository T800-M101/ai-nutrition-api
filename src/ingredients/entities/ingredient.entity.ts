import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., "Chicken breast"

  @Column({ nullable: true })
  description?: string;

  @Column('float')
  caloriesPer100g: number;

  @Column('float')
  proteinPer100g: number;

  @Column('float')
  carbsPer100g: number;

  @Column('float')
  fatsPer100g: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


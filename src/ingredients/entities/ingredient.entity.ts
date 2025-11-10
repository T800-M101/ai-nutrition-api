import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ingredients')
export class Ingredient {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'chicken breast' })
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @ApiProperty({
    example: 'Source of lean protein, low in fat and carbohydrates.',
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.ingredients, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @ApiProperty({ example: 165 })
  @Column({ type: 'float', name: 'calories_per_100g' })
  calories_per_100g: number;

  @ApiProperty({ example: 31 })
  @Column({ type: 'float', name: 'protein_per_100g' })
  protein_per_100g: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'float', name: 'carbs_per_100g' })
  carbs_per_100g: number;

  @ApiProperty({ example: 3.6 })
  @Column({ type: 'float', name: 'fats_per_100g' })
  fats_per_100g: number;

  @ApiProperty({ example: 0, required: false })
  @Column({ type: 'float', name: 'fiber_per_100g', nullable: true })
  fiber_per_100g?: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  created_by?: User;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

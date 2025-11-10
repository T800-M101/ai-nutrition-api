import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Frutas' })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({
    example: 'Plant-based foods that are sweet and rich in simple carbohydrates.',
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.category)
  ingredients: Ingredient[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeName() {
    if (this.name) this.name = this.name.trim().toLowerCase();
  }
}


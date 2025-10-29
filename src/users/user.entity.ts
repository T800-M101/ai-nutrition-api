import { Ai } from "src/ai/ai.entity";
import { Meal } from "src/meals/meal.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    age: number;

    @Column('float')
    weight: number;

    @Column('float', { nullable: true})
    height: number;
    
    @Column()
    goal: string; // lose fat
    
    @Column({ nullable: true})
    preferences?: string; // "vegetarian, non-dairy"

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Meal, meal => meal.user)
    meals: Meal[];

    @OneToMany(() => Ai, ai => ai.user)
    aiRequest: Ai[];
}
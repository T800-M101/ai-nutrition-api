import { Ai } from "src/ai/ai.entity";
import { UserRole } from "src/auth/enums/user-role.enum";
import { Meal } from "src/meals/meal.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

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

    @Column({ type: 'text', nullable: true })
    hashedRefreshToken?: string | null;        

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Meal, meal => meal.user)
    meals: Meal[];

    @OneToMany(() => Ai, ai => ai.user)
    aiRequest: Ai[];
}
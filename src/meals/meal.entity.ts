import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('meals')
export class Meal {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string; // Breakfast, Dinner, etc.

    @Column({ unique: true })
    email: string;

    @Column()
    items: string; // list of meals, it can be used JSON.stringyfy

    @Column('float')
    calories: number;

    @Column('float')
    protein: number;
    
    @Column('float')
    carbs: number;

    @Column('float')
    fats: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, user => user.meals, {onDelete: 'CASCADE'})
    user: User;
}
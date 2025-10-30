import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ai_responses')
export class Ai {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    prompt: string;
    
    @Column('text')
    response: string;

    @Column()
    type: string; // meal-plan, 'analysis', 'chat'

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.aiRequest, { onDelete: 'CASCADE'})
    user: User;

}
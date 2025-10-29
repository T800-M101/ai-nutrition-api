import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './meal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
    constructor(@InjectRepository(Meal) private mealRepo: Repository<Meal> ){}
}

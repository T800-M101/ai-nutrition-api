import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { UsersModule } from './users/users.module';
import { MealsModule } from './meals/meals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Ai } from './ai/entities/ai.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IngredientsModule } from './ingredients/ingredients.module';
import { Meal } from './meals/entities/meal.entity';
import { MealItem } from './meals/entities/meal-item.entity';
import { Ingredient } from './ingredients/entities/ingredient.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [User, Meal, MealItem, Ingredient, Ai, Ingredient, Category],
          synchronize: true,
          logging: ['error', 'warn'],
          //dropSchema: true,
        };
      },
    }),
    AiModule,
    UsersModule,
    MealsModule,
    AuthModule,
    IngredientsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

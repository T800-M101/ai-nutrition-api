import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ai } from './ai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ai])],
  providers: [AiService],
  controllers: [AiController]
})
export class AiModule {}

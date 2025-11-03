import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ai } from './entities/ai.entity';

@Injectable()
export class AiService {
    constructor(@InjectRepository(Ai) private aiRepo: Repository<Ai>){}
}

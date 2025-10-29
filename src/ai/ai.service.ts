import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ai } from './ai.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AiService {
    constructor(@InjectRepository(Ai) private aiRepo: Repository<Ai>){}
}

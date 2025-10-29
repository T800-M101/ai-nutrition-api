import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Logger } from '../util/logger';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  private logger = new Logger('User Service');

  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.info('Create user', { layer: 'service' });

    const user = this.usersRepo.create({ ...createUserDto });
    const savedUser = await this.usersRepo.save(user);

    this.logger.info('User created', {
      layer: 'service',
      userId: savedUser.id,
      email: savedUser.email,
    });

    return savedUser;
  }

  async find(email: string): Promise<User[]> {
    this.logger.info(`Find user by email: ${email}`, { layer: 'service' });

    const foundUser = await this.usersRepo.find({ where: { email } });

    foundUser.forEach((user) => {
      this.logger.info('User found', {
        layer: 'service',
        userId: user.id,
        email: user.email,
      });
    });

    return foundUser;
  }
}

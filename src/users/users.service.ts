import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    this.logger.log(`Creating user - email: ${email}`);

    try {
      const user = this.usersRepo.create({ ...createUserDto });

      const savedUser = await this.usersRepo.save(user);

      this.logger.log(`User created successfully - id: ${savedUser.id}, email: ${savedUser.email}`);

      return savedUser;

    } catch (error) {
      this.logger.error(`Failed to create user - email: ${email}`, error.stack);

      throw new InternalServerErrorException('Could not create user');
    }
  }

  async find(email: string): Promise<User[]> {
    this.logger.debug(`Searching for user by email: ${email}`);

    try {
      const users = await this.usersRepo.find({ where: { email } });

      if (users.length === 0) {
        this.logger.warn(`No users found for email: ${email}`);
      } else {
        users.forEach((user) =>
          this.logger.log(`Found user - id: ${user.id}, email: ${user.email}`),
        );
      }

      return users;
    } catch (error) {
      this.logger.error(`Error finding user - email: ${email}`, error.stack);

      throw new InternalServerErrorException('Could not find user');
    }
  }
}

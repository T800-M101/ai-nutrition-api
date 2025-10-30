import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
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

      this.logger.log(
        `User created successfully - id: ${savedUser.id}, email: ${savedUser.email}`,
      );

      return savedUser;
    } catch (error) {
      this.logger.error(`Failed to create user - email: ${email}`, error.stack);

      throw new InternalServerErrorException('Could not create user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Searching for user by email: ${email}`);
    return await this.usersRepo.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }
}

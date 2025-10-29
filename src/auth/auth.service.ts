import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { email } = createUserDto;
    this.logger.log(`Signup initiated - email: ${email}`);

    // Check if email already exists
    const existing = await this.usersService.find(createUserDto.email);
    if (existing.length) throw new BadRequestException('email in use');

    // Hash password
    this.logger.debug(`Hashing password for email: ${email}`);
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    // Create new user
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;
    this.logger.log(`Signup successful - userId: ${user.id}, email: ${email}`);
    
    return result;
  }
}

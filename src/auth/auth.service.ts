import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { Logger } from '../util/logger';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private logger = new Logger('Auth Service');

  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto): Promise<Partial<User>> {
    this.logger.info('Create user', { layer: 'auth' });

    const existing = await this.usersService.find(createUserDto.email);
    if (existing.length) throw new BadRequestException('email in use');

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }
}

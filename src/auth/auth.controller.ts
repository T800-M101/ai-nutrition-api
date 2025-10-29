import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';
import { Logger } from '@nestjs/common';

@ApiTags('auth')
@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<Partial<User>> {
    const { email } = body;

    this.logger.log(`POST /auth/signup - Received signup request: email: ${email}`);

    const user = await this.authService.signup(body);

    this.logger.log(`User created successfully: ${email}`);

    return user;
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { Logger } from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
@Serialize(AuthResponseDto)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<Partial<AuthResponseDto>> {
    const { email } = body;

    this.logger.log(`POST /auth/signup - Received signup request: email: ${email}`);

    const user = await this.authService.signup(body);

    this.logger.log(`User created successfully: ${email}`);

    return user;
  }

  @Post('/signin')
  async login(@Body() body: SigninDto): Promise<Partial<User>> {
    const { email, password } = body;
  
    this.logger.log(`POST /auth/signin - Received login request: email: ${email}`);

    const user = await this.authService.signin(email, password);
    this.logger.log(`User logged in successfully: ${email}`);

    return user;
  }

  @Post('/refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  
}

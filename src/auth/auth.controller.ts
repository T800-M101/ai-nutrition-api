import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
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

    const user = await this.authService.userSignup(body);
    
    this.logger.log(`User created successfully: ${email}`);

    return user;
  }

  @Post('/admin/signup')
  async adminSignup(@Body() body: CreateUserDto): Promise<Partial<AuthResponseDto>> {
    const { email } = body;
    this.logger.log(`POST /auth/admin/signup - Received admin signup request: email: ${email}`);
    
    const admin = await this.authService.adminSignup(body);
    
    this.logger.log(`Admin created successfully: ${email}`);

    return admin;
  }

  @Post('/signin')
  async login(@Body() body: SigninDto): Promise<Partial<AuthResponseDto>> {
    const { email, password } = body;
  
    this.logger.log(`POST /auth/signin - Received login request: email: ${email}`);

    const user = await this.authService.userSignin(email, password);
    this.logger.log(`User logged in successfully: ${email}`);

    return user;
  }

  @Post('/admin/signin')
  async adminLogin(@Body() body: SigninDto): Promise<Partial<AuthResponseDto>> {
    const { email, password } = body;
  
    this.logger.log(`POST /auth/admin/signin - Received admin login request: email: ${email}`);

    const admin = await this.authService.adminSignin(email, password);
    this.logger.log(`Admin logged in successfully: ${email}`);

    return admin;
  }

  @Post('/refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  
}

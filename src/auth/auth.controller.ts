import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';
import { Logger } from 'src/util/logger';

@ApiTags('Auth')
@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  private logger = new Logger('Auth Controller');

  constructor(private authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto): Promise<Partial<User>> {
    const { email, password } = body;

    this.logger.info(
      `POST - Received create request: email: ${email}, password: *****`,
      { layer: 'controller' },
    );

    const user = await this.authService.signup(body);
    return user;
  }
}

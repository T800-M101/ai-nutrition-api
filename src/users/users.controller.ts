import { Controller, Get, Logger, Param, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from '../auth/dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { RequestWithUser } from 'src/interfaces/resquest-user.interface';

@ApiTags('users')
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth() // Swagger: shows JWT auth required
  async getAllUsers(): Promise<Partial<User>[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get('/:email')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth() 
  async getUser(@Param('email') email: string, @Req() req: RequestWithUser): Promise<Partial<User> | null> {
    const currentUser = req.user;
    const requestedUser = await this.usersService.findByEmail(email);

    // Allow if admin OR if user is requesting their own data
  if (currentUser.role !== UserRole.ADMIN && currentUser.email !== email) {
    throw new UnauthorizedException('You can only access your own profile');
  }
    return requestedUser;
  }

}

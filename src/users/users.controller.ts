import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from '../auth/dtos/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { RequestWithUser } from 'src/interfaces/resquest-user.interface';
import { UpdateUserDto } from './dtos/update-user.dto';

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
    this.logger.log('GET /users - Received get request all users');
    const users = await this.usersService.findAll();

    this.logger.log('Returning users');
    return users;
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getMe(@Req() req: RequestWithUser): Promise<Partial<User> | null> {
    this.logger.log('GET /me - Received get request own user');
    const user = await this.usersService.findByEmail(req.user.email);

    this.logger.log('Returning user');
    return user;
  }

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateUser(
    @Param('email') email: string,
    @Body() attrs: UpdateUserDto,
  ): Promise<Partial<User>> {
    this.logger.log('PATCH /me - Received patch request own user');
    const updatedUser = await this.usersService.update(email, attrs);

    this.logger.log('Returning updated user');
    return updatedUser;
  }

  @Delete('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('email') email: string): Promise<Partial<User>> {
    this.logger.log('PATCH /me - Received delete request own user');
    const deletedUser = await this.usersService.delete(email);

    this.logger.log('Returning deleted user');
    return deletedUser;
  }
}

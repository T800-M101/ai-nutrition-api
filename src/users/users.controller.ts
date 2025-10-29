import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@ApiTags('users')
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor() {}
}

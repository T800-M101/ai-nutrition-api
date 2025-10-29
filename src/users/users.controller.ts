import { Controller } from '@nestjs/common';
import { Logger } from '../util/logger';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@ApiTags('users')
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  private logger = new Logger('User Controller');

  constructor() {}
}

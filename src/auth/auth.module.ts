import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // AuthService depends on UsersService

@Module({
  imports: [UsersModule], // import the module that provides UsersService
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

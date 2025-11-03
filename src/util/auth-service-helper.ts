import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

export class AuthServiceHelper {
  static async generateTokens(
    user: User,
    jwtService: JwtService,
    configService: ConfigService,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const jwtSecret = configService.get<string>('JWT_SECRET');

    const accessToken = await jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '15m',
    });

    const refreshToken = await jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}

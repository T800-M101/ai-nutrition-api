import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './enums/user-role.enum';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    // normal signup always defaults to USER
    createUserDto.role = createUserDto.role ?? UserRole.USER;

    const { email } = createUserDto;
    this.logger.log(`Signup initiated - email: ${email}`);

    // Check if email already exists
    const existing = await this.usersService.findByEmail(createUserDto.email);
    if (existing) throw new BadRequestException('email in use');

    // Hash password
    this.logger.debug(`Hashing password for email: ${email}`);
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    // Create new user
    const user = await this.usersService.create(createUserDto);

    //Create JWT and refresh token
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '7d',
    });

    // Save hashed refresh token in DB
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateHashedRefreshToken(
      user.id,
      hashedRefreshToken,
    );

    this.logger.log(`Signup successful - userId: ${user.id}, email: ${email}`);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async signin(email: string, password: string): Promise<Partial<AuthResponseDto>> {
    this.logger.log(`Signin initiated - email: ${email}`);

    // Find user by email
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');

    // Generate JWT
    const payload = { sub: user.id, email: user.email, role: user.role};
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '15m', // Increased from default
    });

    this.logger.log(`Signin successful - userId: ${user.id}, email: ${email}`);

    return {
      user,
      accessToken
    };
  }

  async refreshToken(refreshToken: string): Promise<{accessToken: string}> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.usersService.findByEmail(payload.email);

      if (!user || !user.hashedRefreshToken)
        throw new UnauthorizedException('Invalid refresh token');

      const isMatch = await bcrypt.compare(
        refreshToken,
        user.hashedRefreshToken,
      );
      if (!isMatch) throw new UnauthorizedException('Refresh token mismatch');

      // Issue new access token
      const newAccessToken = await this.jwtService.signAsync(
        { sub: user.id, email: user.email, role: user.role },
        { expiresIn: '1h' },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(userId: number) {
    await this.usersService.updateHashedRefreshToken(userId, null);
  }
}

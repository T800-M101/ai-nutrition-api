import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './enums/user-role.enum';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { ConfigService } from '@nestjs/config';
import { AuthServiceHelper } from 'src/util/auth-service-helper';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
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

    return this.handleTokens(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    return this.create(createUserDto);
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    createUserDto.role = UserRole.ADMIN;
    return this.create(createUserDto);
  }

  async userSignin(userId: number, password: string): Promise<AuthResponseDto> {
    const user = await this.validateUserCredentials(userId, password);
    return this.handleTokens(user);
  }

  async adminSignin(userId: number, password: string): Promise<AuthResponseDto> {
    const user = await this.validateUserCredentials(userId, password);

    // Check if user is an admin
    if (user.role !== UserRole.ADMIN) {
      this.logger.warn(`Unauthorized admin signin attempt - id: ${userId}`);
      throw new ForbiddenException('Access denied: Admins only');
    }

    return this.handleTokens(user);
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.usersService.findById(payload.id);

      if (!user || !user.hashed_refresh_token)
        throw new UnauthorizedException('Invalid refresh token');

      const isMatch = await bcrypt.compare(
        refreshToken,
        user.hashed_refresh_token,
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

  private async handleTokens(user: User): Promise<AuthResponseDto> {
    const { accessToken, refreshToken } =
      await AuthServiceHelper.generateTokens(
        user,
        this.jwtService,
        this.configService,
      );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateHashedRefreshToken(
      user.id,
      hashedRefreshToken,
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  private async validateUserCredentials(
    userId: number,
    password: string,
  ): Promise<User> {
    this.logger.log(`Signin initiated - id: ${userId}`);

    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async logout(userId: number) {
    await this.usersService.updateHashedRefreshToken(userId, null);
  }
}

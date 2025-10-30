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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<Partial<User>> {
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

    //Create JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    // attach token temporarily to the user object
    (user as any).accessToken = accessToken;

    this.logger.log(`Signup successful - userId: ${user.id}, email: ${email}`);

    return user;
  }

  async signin(email: string, password: string): Promise<Partial<User>> {
    this.logger.log(`Signin initiated - email: ${email}`);

    // Find user by email
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');

    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    (user as any).accessToken = accessToken;

    this.logger.log(`Signin successful - userId: ${user.id}, email: ${email}`);

    return user;
  }
}

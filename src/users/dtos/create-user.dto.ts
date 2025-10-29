import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'test@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 25, description: 'User age in years' })
  @IsNumber()
  @Min(0)
  age: number;

  @ApiProperty({ example: 70.5, description: 'User weight in kg' })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({ example: 175, description: 'User height in cm', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @ApiProperty({ example: 'lose fat', description: 'User fitness goal' })
  @IsString()
  goal: string;

  @ApiProperty({ example: 'vegetarian, non-dairy', description: 'User dietary preferences', required: false })
  @IsOptional()
  @IsString()
  preferences?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 12 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  password: string;
}
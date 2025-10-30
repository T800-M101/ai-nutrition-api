import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  age: number;

  @Expose()
  weight: number;

  @Expose()
  height?: number;

  @Expose()
  goal: string;

  @Expose()
  preferences?: string;

  @Expose()
  accessToken?: string;

  @Exclude()
  password: string;
}

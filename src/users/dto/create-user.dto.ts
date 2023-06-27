import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}

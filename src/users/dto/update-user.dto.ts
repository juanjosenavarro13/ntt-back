import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'John', required: false })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  surname: number;

  @ApiProperty({ example: 'john@doe.es', required: false })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', required: false })
  @IsString()
  password: string;

  @ApiProperty({ example: 'admin', required: false })
  @IsString()
  role: string;
}

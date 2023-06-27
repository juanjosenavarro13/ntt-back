import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 400,
    description: 'email exits',
  })
  @ApiResponse({
    status: 200,
    description: 'user created',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'users found',
  })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'user found',
  })
  @ApiResponse({
    status: 400,
    description: 'user no exist',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'user updated',
  })
  @ApiResponse({
    status: 400,
    description: 'user no exist',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({
    status: 400,
    description: 'user no exist',
  })
  @ApiResponse({
    status: 200,
    description: 'user deleted',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

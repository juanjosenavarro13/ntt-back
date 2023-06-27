import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    return await this.userModel
      .findOne({ email })
      .then((user) => {
        if (user) {
          throw new HttpException('email exits', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
      })
      .catch(() => {
        throw new HttpException('email exits', HttpStatus.BAD_REQUEST);
      });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(_id: string): Promise<User> {
    return await this.userModel
      .findById(_id)
      .exec()
      .then((user) => {
        if (user === null)
          throw new HttpException('user no exist', HttpStatus.BAD_REQUEST);

        return user;
      })
      .catch((e) => {
        console.log('ERRORR', e);
        throw new HttpException('user no exist', HttpStatus.BAD_REQUEST);
      });
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel
      .findById(_id)
      .exec()
      .then((user) => {
        if (user === null)
          throw new HttpException('user no exist', HttpStatus.BAD_REQUEST);
        return this.userModel.updateOne({ _id }, updateUserDto);
      })
      .catch(() => {
        throw new HttpException('user no exist', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(_id: string) {
    return await this.userModel
      .findById(_id)
      .exec()
      .then((user) => {
        if (user === null)
          throw new HttpException('user no exist', HttpStatus.BAD_REQUEST);
        return this.userModel.deleteOne({ _id });
      })
      .catch(() => {
        throw new HttpException('user no exist', HttpStatus.BAD_REQUEST);
      });
  }
}

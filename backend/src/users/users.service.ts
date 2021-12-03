import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { IUser } from './interface/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<IUser>,
  ) { }

  public async create(user: CreateUserDto): Promise<IUser> {
    if (await this.findByEmail(user.email)) {
      throw new Error('EMAIL_IN_USE');
    }

    const createdUser = await this.usersModel.create(user);
    return this.usersModel.findById(createdUser._id);
  }
  public async findByEmail(email: string, forPasswordVerification = false): Promise<IUser> {
    let query = this.usersModel.findOne({ email });

    if (forPasswordVerification) {
      query = query.select('+salt +password');
    }

    return query;
  }

  public async findById(userId: string): Promise<IUser> {
    return this.usersModel.findById(userId);
  }

}
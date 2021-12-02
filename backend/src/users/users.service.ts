import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) { }

  public async create(user: CreateUserDto): Promise<User> {
    if (await this.findByEmail(user.email)) {
      throw new Error('EMAIL_IN_USE');
    }

    const createdUser = await this.usersModel.create(user);
    return this.usersModel.findById(createdUser._id);
  }

  public async findByEmail(email: string, forPasswordVerification = false): Promise<User> {
    let query = this.usersModel.findOne({ email });

    if (forPasswordVerification) {
      query = query.select('+salt +password');
    }

    return query.lean().exec();
  }

  public async findById(userId: string, forJwtValidation = false): Promise<User> {
    let query = this.usersModel.findById(userId);

    if (forJwtValidation) {
      query = query.select('+tokenCodes');
    }

    return query.lean().exec();
  }

}
import * as fs from 'fs';
import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/interface/user.interface';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { PasswordService } from '../services/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(userDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(userDto.email, true);
    if (!user) {
      throw { message: 'LOGIN_ERR', status: HttpStatus.UNAUTHORIZED };
    }

    const { hash } = this.passwordService.hash(userDto.password, user.salt);
    if (user.password !== hash) {
      throw { message: 'LOGIN_ERR', status: HttpStatus.UNAUTHORIZED };
    }

    const token = this.signUserToken(user._id, user.email);
    const { email, name, _id } = user;

    return { email, name, _id, token };
  }

  public async register(userDto: RegisterUserDto) {
    let error: any;
    let user: IUser;

    const { salt, hash } = this.passwordService.hash(userDto.password);

    user = await this.usersService.create({ ...userDto, salt, password: hash });

    if (error || (error && error.code === 11000)) {
      throw { message: 'EMAIL_IN_USE', status: HttpStatus.FORBIDDEN };
    }

    const token = this.signUserToken(user._id, user.email);
    const { email, name, _id } = user;
    return { email, name, _id, token };
  }

  private signUserToken(id: string, email: string): string {
    const payload: IJwtPayload = { id, email, iss: this.configService.getEnv('ISS') };
    const privateKey = `${fs.readFileSync('./keys/private.key').toString().replace(/\r?\n|\r/g, '')}`;

    return this.jwtService.sign(payload, { privateKey });
  }

  public async validateUser(payload: IJwtPayload): Promise<IUser> {
    console.log({validateUser: payload})
    return await this.usersService.findById(payload.id);
  }
}

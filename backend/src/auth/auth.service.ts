import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import { CreateUserDto } from '../users/dto/create.dto';
import { LoginUserDto } from './dto/login.dto';
import { PasswordService } from '../services/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

    const tokenCode = this.passwordService.generateRandomString(32);

    delete user.password; delete user.salt;
    return { user, token: this.signUserToken(user, tokenCode, 'login') };
  }

  public async register(userDto: CreateUserDto) {
    let error: any;
    let user: User;

    const { salt, hash } = this.passwordService.hash(userDto.password);
    const tokenCode = this.passwordService.generateRandomString(32);

    user = await this.usersService.create({ ...userDto, salt, password: hash });

    if (error || (error && error.code === 11000)) {
      throw { message: 'EMAIL_IN_USE', status: HttpStatus.FORBIDDEN };
    }

    return { user, token: this.signUserToken(user, tokenCode, 'register') };
  }

  private signUserToken(user: User, token: string, iss = 'unknown'): string {
    const payload: IJwtPayload = { iss, id: user._id, email: user.email, token };
    return this.jwtService.sign(payload);
  }

  public async validateUser(payload: IJwtPayload): Promise<User> {
    return await this.usersService.findById(payload.id, true);
  }
}

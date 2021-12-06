import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto);
    }

    @Post('register')
    async register(@Body() userDto: RegisterUserDto) {
        return this.authService.register(userDto);
    }
}

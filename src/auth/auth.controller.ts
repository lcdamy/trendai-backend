import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() signupBody,
    @Headers('host') host: string,
  ): Promise<{ token: string }> {
    return this.authService.signUp(signupBody, host);
  }

  @Post('/login')
  login(@Body() loginBody: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginBody);
  }

  @UseGuards(AuthGuard())
  @Get('/profile')
  async getUserProfile(@Req() req): Promise<User> {
    return this.authService.findById(req.user._id);
  }

  @UseGuards(AuthGuard())
  @Get('/users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.findAll();
  }
}

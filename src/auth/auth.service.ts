import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpBody: User, host): Promise<{ token: string }> {
    const { name, email, password, type, image_url } = signUpBody;

    const userExist = await this.userModel.findOne({ email });
    if (userExist) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      type,
      image_url:
        type === 'Brand'
          ? `http://${host}/logo.png`
          : `http://${host}/profile.jpeg`,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(loginBody: LoginDto) {
    const { email, password } = loginBody;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPaswordPassed = await bcrypt.compare(password, user.password);

    if (!isPaswordPassed) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token, type: user.type };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }
}

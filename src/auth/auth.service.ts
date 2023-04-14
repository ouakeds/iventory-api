import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    const isSamePassword = await bcrypt.compare(pass, user.password);

    if (user && isSamePassword) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateToken(user: User): Promise<string> {
    const payload = { sub: user._id, email: user.email };
    const expiresIn = this.configService.get<string>('JWT_SECRET') ?? '1d';
    const secret = this.configService.get<string>('JWT_SECRET'); // Récupération de la variable d'environnement JWT_SECRET
    const token = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret,
    });
    return token;
  }
}

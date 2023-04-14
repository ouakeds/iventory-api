import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    const jwtPayload = await this.authService.validateUser(email, password);

    if (!jwtPayload) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.authService.login(jwtPayload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

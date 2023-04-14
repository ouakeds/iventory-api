import { Body, Controller, Post } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import CreateUserDto from './dto/createUser.dto';
import CreateAgencyDto from 'src/agency/dto/createAgency.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async createUserWithAgency(
    @Body()
    { user, agency }: { user: CreateUserDto; agency: CreateAgencyDto },
  ): Promise<User> {
    return this.userService.create(user, agency);
  }
}

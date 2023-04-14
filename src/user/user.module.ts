import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AgencyModule } from '../agency/agency.module'; // Import du AgencyModule
import { Agency, AgencySchema } from 'src/agency/schemas/agency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Agency.name, schema: AgencySchema },
    ]),
    AgencyModule, // Ajout du AgencyModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

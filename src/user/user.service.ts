import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Agency, AgencyDocument } from '../agency/schemas/agency.schema';
import * as bcrypt from 'bcryptjs';
import { AgencyService } from 'src/agency/agency.service';
import CreateAgencyDto from 'src/agency/dto/createAgency.dto';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Agency.name)
    private readonly agencyService: AgencyService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    agencyToCreate: CreateAgencyDto,
  ): Promise<User> {
    const agency = await this.agencyService.create(agencyToCreate);
    const newUser = new this.userModel({
      ...createUserDto,
      agency: agency,
    });
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);
    return await newUser.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email }).orFail();
    } catch (error) {
      throw new NotFoundException('Unable to find user', {
        cause: error,
        description: error?.message,
      });
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id).orFail();
    } catch (error) {
      throw new NotFoundException('Unable to find user', {
        cause: error,
        description: error?.message,
      });
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency, AgencyDocument } from './schemas/agency.schema';
import CreateAgencyDto from './dto/createAgency.dto';

@Injectable()
export class AgencyService {
  constructor(
    @InjectModel(Agency.name)
    private readonly agencyModel: Model<AgencyDocument>,
  ) {}

  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    const createdAgency = new this.agencyModel(createAgencyDto);
    return await createdAgency.save();
  }

  async findOneById(id: string): Promise<Agency> {
    return await this.agencyModel.findById(id).exec();
  }

  async deleteOneById(id: string): Promise<Agency> {
    return await this.agencyModel.findByIdAndDelete(id).exec();
  }

  async updateOneById(id: string, agency: Agency): Promise<Agency> {
    return await this.agencyModel
      .findByIdAndUpdate(id, agency, {
        new: true,
      })
      .exec();
  }
}

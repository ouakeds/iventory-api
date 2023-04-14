import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Agency, AgencyDocument } from '../agency/schemas/agency.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Agency.name) private agencyModel: Model<AgencyDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    agencyId: string,
  ): Promise<Category> {
    const agency = await this.agencyModel.findById(agencyId);

    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    const category = new this.categoryModel(createCategoryDto);
    category.agency = agency;
    return category.save();
  }

  async findAll(agencyId: string): Promise<Category[]> {
    const agency = await this.agencyModel.findById(agencyId);

    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    return this.categoryModel.find({ agency: agencyId }).exec();
  }

  async findOne(id: string, agencyId: string): Promise<Category> {
    const agency = await this.agencyModel.findById(agencyId);
    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    const category = await this.categoryModel
      .findOne({
        _id: id,
        agency: agencyId,
      })
      .exec();

    if (!category) {
      throw new Error(
        `Category with ID ${id} not found for agency with ID ${agencyId}`,
      );
    }

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    agencyId: string,
  ): Promise<Category> {
    const agency = await this.agencyModel.findById(agencyId);
    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    const category = await this.categoryModel.findOneAndUpdate(
      { _id: id, agency: agencyId },
      { $set: updateCategoryDto },
      { new: true },
    );
    if (!category) {
      throw new Error(
        `Category with ID ${id} not found for agency with ID ${agencyId}`,
      );
    }

    return category;
  }

  async remove(id: string, agencyId: string): Promise<Category> {
    const agency = await this.agencyModel.findById(agencyId);
    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    const category = await this.categoryModel.findOneAndDelete({
      _id: id,
      agency: agencyId,
    });
    if (!category) {
      throw new Error(
        `Category with ID ${id} not found for agency with ID ${agencyId}`,
      );
    }

    return category;
  }
}

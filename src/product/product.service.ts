import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Agency, AgencyDocument } from '../agency/schemas/agency.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Agency.name) private agencyModel: Model<AgencyDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    agencyId: string,
  ): Promise<Product> {
    const agency = await this.agencyModel.findById(agencyId);

    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    const product = new this.productModel(createProductDto);
    product.agency = agency;
    return product.save();
  }

  async findAll(agencyId: string): Promise<Product[]> {
    const agency = await this.agencyModel.findById(agencyId);

    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    return this.productModel.find({ agency: agencyId }).exec();
  }

  async findOne(id: string, agencyId: string): Promise<Product> {
    const agency = await this.agencyModel.findById(agencyId);
    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    const product = await this.productModel
      .findOne({
        _id: id,
        agency: agencyId,
      })
      .exec();

    if (!product) {
      throw new Error(
        `Product with ID ${id} not found for agency with ID ${agencyId}`,
      );
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    agencyId: string,
  ): Promise<Product> {
    const agency = await this.agencyModel.findById(agencyId);
    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    const product = await this.productModel.findOneAndUpdate(
      { _id: id, agency: agencyId },
      { $set: updateProductDto },
      { new: true },
    );
    if (!product) {
      throw new Error(
        `Product with ID ${id} not found for agency with ID ${agencyId}`,
      );
    }

    return product;
  }

  async remove(id: string, agencyId: string): Promise<Product> {
    const agency = await this.agencyModel.findById(agencyId);
    if (!agency) {
      throw new Error(`Agency with ID ${agencyId} not found`);
    }

    const product = await this.productModel.findOneAndDelete({
      _id: id,
      agency: agencyId,
    });
    if (!product) {
      throw new Error(
        `Product with ID ${id} not found for agency with ID ${agencyId}`,
      );
    }

    return product;
  }
}

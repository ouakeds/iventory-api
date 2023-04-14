import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { ProductService } from './product.service';
import { CategoryService } from 'src/category/category.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async create(
    @Request() request,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const {
      user: { agency },
    } = request;

    try {
      const product = await this.productService.create(
        createProductDto,
        agency,
      );
      return product;
    } catch (error) {
      throw new NotFoundException('Agency not found.');
    }
  }

  @Get()
  async findAll(@Request() request): Promise<Product[]> {
    const {
      user: { agency },
    } = request;

    try {
      const categories = await this.productService.findAll(agency);
      return categories;
    } catch (error) {
      throw new NotFoundException('Agency not found.');
    }
  }

  @Get(':id')
  async findOne(@Request() request, @Param('id') id: string): Promise<Product> {
    const {
      user: { agency },
    } = request;

    try {
      const product = await this.productService.findOne(id, agency);
      return product;
    } catch (error) {
      throw new NotFoundException('Product not found.');
    }
  }

  @Put(':id')
  async update(
    @Request() request,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const {
      user: { agency },
    } = request;

    try {
      const updatedProduct = await this.productService.update(
        id,
        updateProductDto,
        agency,
      );
      return updatedProduct;
    } catch (error) {
      throw new NotFoundException('Product not found.');
    }
  }

  @Delete(':id')
  async remove(@Request() request, @Param('id') id: string) {
    const {
      user: { agency },
    } = request;

    try {
      const deletedProduct = await this.productService.remove(id, agency);
      if (!deletedProduct) {
        throw new NotFoundException('Product not found');
      }
    } catch (error) {
      throw new NotFoundException('Product not found.');
    }
  }
}

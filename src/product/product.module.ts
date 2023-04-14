import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductService } from './product.service';
import { Agency, AgencySchema } from '../agency/schemas/agency.schema';
import { AgencyService } from '../agency/agency.service';
import { ProductController } from './product.controller';
import { CategoryService } from 'src/category/category.service';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Agency.name, schema: AgencySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [ProductService, AgencyService, CategoryService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { Agency, AgencySchema } from '../agency/schemas/agency.schema';
import { AgencyService } from '../agency/agency.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Agency.name, schema: AgencySchema },
    ]),
  ],
  providers: [CategoryService, AgencyService],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}

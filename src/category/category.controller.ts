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
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Request() request,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const {
      user: { agency },
    } = request;

    try {
      const category = await this.categoryService.create(
        createCategoryDto,
        agency,
      );
      return category;
    } catch (error) {
      throw new NotFoundException('Agency not found.');
    }
  }

  @Get()
  async findAll(@Request() request): Promise<Category[]> {
    const {
      user: { agency },
    } = request;

    try {
      const categories = await this.categoryService.findAll(agency);
      return categories;
    } catch (error) {
      throw new NotFoundException('Agency not found.');
    }
  }

  @Get(':id')
  async findOne(
    @Request() request,
    @Param('id') id: string,
  ): Promise<Category> {
    const {
      user: { agency },
    } = request;

    try {
      const category = await this.categoryService.findOne(id, agency);
      return category;
    } catch (error) {
      throw new NotFoundException('Category not found.');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() request,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const {
      user: { agency },
    } = request;

    try {
      const updatedCategory = await this.categoryService.update(
        id,
        updateCategoryDto,
        agency,
      );
      return updatedCategory;
    } catch (error) {
      throw new NotFoundException('Category not found.');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() request, @Param('id') id: string) {
    const {
      user: { agency },
    } = request;

    try {
      const deletedCategory = await this.categoryService.remove(id, agency);
      if (!deletedCategory) {
        throw new NotFoundException('Category not found');
      }
    } catch (error) {
      throw new NotFoundException('Category not found.');
    }
  }
}

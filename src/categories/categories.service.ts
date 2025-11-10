import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>
  ) {}

  // CREATE
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const { name } = createCategoryDto;

    const existing = await this.categoriesRepo.findOneBy({ name });
    if (existing)
      throw new ConflictException(
        `Category with name "${name}" already exists`,
      );

    this.logger.log(`Creating new category ${name}`);
    const newCategory = this.categoriesRepo.create(createCategoryDto);

    const savedCategory = await this.categoriesRepo.save(newCategory);
    this.logger.log(`Category ${name} was created`);

    return savedCategory;
  }

  // FIND ALL

  async findAll(): Promise<CategoryResponseDto[]> {
    this.logger.log(`Fetching list of all categories`);

    const categories = await this.categoriesRepo.find();

    if (!categories) throw new NotFoundException('No categories found');

    this.logger.log('List of all categories found');

    return categories;
  }

  // FIND ONE

  async findOne(id: number): Promise<CategoryResponseDto> {
    const category = await this.findEntity(id);

    if (!category)
      throw new NotFoundException(`Category by id ${id} not found`);

    this.logger.log(`Category by id ${id} found`);

    return category;
  }

  // UPDATE
  async update( id: number, attrs: UpdateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.findEntity(id);

    Object.assign(category, attrs);

    const updatedCategory = await this.categoriesRepo.save(category);

    this.logger.log('Category has been updated.');

    return updatedCategory;
  }

  // REMOVE
  async remove(id: number): Promise<CategoryResponseDto> {
    const category = await this.findEntity(id);

    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);

    const deleted = { ...category };

    await this.categoriesRepo.remove(category);

    this.logger.log(`Category with ID ${id} has been removed.`);

    return deleted;
  }

  // HELPER FUNCTION TO FIND ENTITY
  async findEntity(id: number): Promise<Category> {
    this.logger.log(`Fetching category by id ${id}`);

    const category = await this.categoriesRepo.findOneBy({ id });

    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return category;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { CategoryResponseDto } from './dto/category-response.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';


@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.USER)
@ApiResponse({ status: 401, description: 'Unauthorized – missing or invalid token' })
@ApiResponse({ status: 403, description: 'Forbidden – insufficient role' })
@Controller('categories')
@Serialize(CategoryResponseDto)
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);

  constructor(private readonly categoriesService: CategoriesService) {}

  // ---------- CREATE ----------
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category successfully created', type: CategoryResponseDto })
  @ApiResponse({ status: 409, description: 'Category with the same name already exists' })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    this.logger.log(`POST /categories - Received create category request`);

    const category = await this.categoriesService.create(createCategoryDto);
    this.logger.log('Return category created');

    return category
  }

  // ---------- FIND ALL ----------
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of all categories', type: [CategoryResponseDto] })
  async findAll(): Promise<CategoryResponseDto[]> {
    this.logger.log(`GET /categories - Received find all categories request`);
    
    const categories = await this.categoriesService.findAll();

    this.logger.log(`Return list of all categories`);

    return categories;

  }

  // ---------- FIND ONE ----------
  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category found', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`GET /categories/id - Received get categorie by id ${id} request`);

    const category = await this.categoriesService.findOne(id);

    this.logger.log(`Returning category by id ${id}`);

    return category;
  }

  // ---------- UPDATE ----------
  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category successfully updated', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() attrs: UpdateCategoryDto): Promise<CategoryResponseDto> {
    this.logger.log(`PATCH /categories/id - Received patch categorie by id ${id} request`);

    const category = await this.categoriesService.update(id, attrs);

    this.logger.log(`Returning category updated`);

    return category;
  }

  // ---------- DELETE ----------
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category successfully deleted', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CategoryResponseDto> {
    this.logger.log(`DELETE /categories/id - Received delete categorie by id ${id} request`);

    const category = await this.categoriesService.remove(id);

    this.logger.log(`Returning deleted category`);

    return category;
  }
}

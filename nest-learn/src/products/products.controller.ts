import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('products')
export class ProductsController {

	constructor(private readonly productService: ProductsService) { }

	@Get()
	async getProducts() {
		return this.productService.get();
	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);
		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		}
		return product;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.deleteById(id);
		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.updateById(id, dto);
		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		}
		return updatedProduct;
	}

	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}

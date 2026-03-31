import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { FindTopPagesDto } from './dto/find-top-pages.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPagesService } from './top-pages.service';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { TOP_PAGES_NOT_FOUND_ERROR } from './top-pages.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-pages')
export class TopPagesController {

	constructor(private readonly topPagesService: TopPagesService) { }

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPagesService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPagesService.findById(id);
		if (!page) {
			throw new NotFoundException(TOP_PAGES_NOT_FOUND_ERROR);
		}
		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.topPagesService.findByAlias(alias);
		if (!page) {
			throw new NotFoundException(TOP_PAGES_NOT_FOUND_ERROR);
		}
		return page;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.topPagesService.deleteById(id);
		if (!deletedPage) {
			throw new NotFoundException(TOP_PAGES_NOT_FOUND_ERROR)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatedPage = await this.topPagesService.updateById(id, dto);
		if (!updatedPage) {
			throw new NotFoundException(TOP_PAGES_NOT_FOUND_ERROR)
		}
		return updatedPage;
	}

	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPagesDto) {
		return this.topPagesService.findByCategory(dto.firstLevelCategory);
	}
}

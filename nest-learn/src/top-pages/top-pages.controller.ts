import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPagesDto } from './dto/find-top-pages.dto';

@Controller('top-pages')
export class TopPagesController {

	@Post('create')
	async create(@Body() dto: Omit<TopPageModel, '_id '>) {

	}

	@Get(':id')
	async get(@Param('id') id: string) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: TopPageModel) {

	}

	@HttpCode(200)
	@Post('products')
	async find(@Body() dto: FindTopPagesDto) {

	}
}

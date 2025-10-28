import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('reviews')
export class ReviewsController {

	@Post('create')
	async create(@Body() dto: Omit<ReviewModel, '_id '>) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Get('byProduct/:productId')
	async get(@Param('productId') productId: string) {

	}
}

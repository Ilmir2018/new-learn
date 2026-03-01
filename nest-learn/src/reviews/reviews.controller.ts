import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';

@Controller('reviews')
export class ReviewsController {

	constructor(private readonly reviewService: ReviewsService) { }

	@Get()
	async getAllReviews() {
		return this.reviewService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('byProduct/:productId')
	async get(@Param('productId') productId: string, @UserEmail() email: string) {
		console.log(email)
		return this.reviewService.findByProductId(productId);
	}
}

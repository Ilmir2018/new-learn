import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewModel, ReviewSchema } from './review.model';
import { ReviewsService } from './reviews.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ReviewsController],
  imports: [
    MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }]),
  ],
  providers: [ReviewsService],
  exports: [ReviewsService]
})
export class ReviewsModule { }

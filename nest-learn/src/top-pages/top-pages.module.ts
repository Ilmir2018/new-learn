import { Module } from '@nestjs/common';
import { TopPagesController } from './top-pages.controller';
import { TopPageModel, TopPageSchema } from './top-page.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TopPagesController],
  imports: [
    MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }]),
  ]
})
export class TopPagesModule { }

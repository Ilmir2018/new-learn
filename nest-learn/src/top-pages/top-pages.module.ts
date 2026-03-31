import { Module } from '@nestjs/common';
import { TopPagesController } from './top-pages.controller';
import { TopPageModel, TopPageSchema } from './top-page.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPagesService } from './top-pages.service';

@Module({
  controllers: [TopPagesController],
  imports: [
    MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }]),
  ],
  providers: [TopPagesService]
})
export class TopPagesModule { }

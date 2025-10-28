import { Module } from '@nestjs/common';
import { TopPagesController } from './top-pages.controller';

@Module({
  controllers: [TopPagesController]
})
export class TopPagesModule {}

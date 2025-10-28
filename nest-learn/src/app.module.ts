import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TopPagesModule } from './top-pages/top-pages.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [AuthModule, ProductsModule, TopPagesModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

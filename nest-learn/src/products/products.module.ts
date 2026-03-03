import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductModel, ProductSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }]),
  ],
  providers: [ProductsService]
})
export class ProductsModule { }

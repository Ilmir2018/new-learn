import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductModel, ProductSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }]),
  ]
})
export class ProductsModule { }

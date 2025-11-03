import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ _id: false })
export class ProductCharacteristics {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

export const ProductCharacteristicsSchema = SchemaFactory.createForClass(ProductCharacteristics);

@Schema({ timestamps: true })
export class ProductModel extends Document {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop({ type: [String] })
	categories: string[];

	@Prop({ type: [String] })
	tags: string[];

	@Prop({ type: [ProductCharacteristicsSchema] })
	characteristics: ProductCharacteristics[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);

export type ProductDocument = ProductModel & Document;

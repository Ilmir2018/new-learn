import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuthDocument = UserModel & Document;
@Schema({ timestamps: true })
export class UserModel {

	@Prop({ unique: true })
	email: string;

	@Prop()
	passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(UserModel);
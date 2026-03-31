import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPageModel } from './top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory } from './top-page.interfaces';

@Injectable()
export class TopPagesService {

	constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageModel>) { }

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByCategory(firstLevelCategory: TopLevelCategory) {
		return this.topPageModel.find({ firstLevelCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.find({ alias }).exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
}

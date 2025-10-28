import { IAdvantages, IHh, TopLevelCategory } from "./top-page.interfaces";

export class TopPageModel {
	firstLevelCategory: TopLevelCategory;
	secondCategory: string;
	title: string;
	category: string;
	hh?: IHh;
	advantages: IAdvantages[];
	seoText: string;
	tagsTitle: string;
	tags: string[];
}



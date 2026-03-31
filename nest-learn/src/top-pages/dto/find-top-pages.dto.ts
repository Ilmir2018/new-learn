import { IsEnum } from "class-validator";
import { TopLevelCategory } from "../top-page.interfaces";

export class FindTopPagesDto {
	@IsEnum(TopLevelCategory)
	firstLevelCategory: TopLevelCategory;
}
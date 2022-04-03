import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, Min, MinLength } from 'class-validator';
import { SearchType } from './dev-link.model';

export class SearchDevLinkParam {
	@Type(() => Number)
	@IsEnum(SearchType)
	public type: SearchType;

	@Type(() => Number)
	@IsNumber()
	@Min(1)
	public page: number;

	@IsOptional()
	@MinLength(2)
	public title?: string | undefined;

	@IsOptional()
	@Transform(({ value }) => (value as string).split(','))
	@IsArray()
	public tagList?: string[] | undefined;
}


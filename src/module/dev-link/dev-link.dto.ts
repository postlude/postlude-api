import { Expose, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';
import { SearchType } from './dev-link.model';
import { FromSingleToArray } from 'src/decorator/FromSingleToArray';

export class SearchDevLinkQuery {
	@Type(() => Number)
	@IsEnum(SearchType)
	public searchType: SearchType;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	public page: number;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	public title?: string;

	@IsOptional()
	@FromSingleToArray()
	@IsString({ each: true })
	public tagNames?: string[];
}

export class TagDto {
	@IsOptional()
	@IsInt()
	@Min(1)
	@Expose()
	public id?: number;

	@IsString()
	@IsNotEmpty()
	@Expose()
	public name: string;
}

export class DevLinkDto {
	@IsOptional()
	@IsInt()
	@Min(1)
	@Expose()
	public id?: number;

	@IsString()
	@IsNotEmpty()
	@Expose()
	public title: string;

	@IsUrl()
	@IsNotEmpty()
	@Expose()
	public url: string;

	@IsArray()
	@ArrayNotEmpty()
	@Type(() => TagDto)
	@Expose()
	public tags: TagDto[];
}

export class SearchDevLinkDto {
	@Expose()
	public id: number;

	@Expose()
	public title: string;

	@Expose()
	public url: string;
}
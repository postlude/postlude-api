import { Expose, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';

export class SearchDevLinkQuery {
	@Type(() => Number)
	@IsInt()
	@Min(1)
	public page: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	public searchWord: string;
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


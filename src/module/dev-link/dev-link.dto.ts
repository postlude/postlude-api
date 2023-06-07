import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class SearchDevLinkQuery {
	@Type(() => Number)
	@IsInt()
	@Min(1)
	public page: number;

	@IsString()
	@IsNotEmpty()
	public tagName: string;

	// @IsOptional()
	// @MinLength(2)
	// public title?: string;

	// @IsOptional()
	// @Transform(({ value }) => (value as string).split(','))
	// @IsArray()
	// public tagList?: string[];
}

export class DevLinkDto {
	@IsInt()
	@Min(1)
	@Expose()
	public id: number;

	@IsString()
	@IsNotEmpty()
	@Expose()
	public title: string;

	@IsUrl()
	@IsNotEmpty()
	@Expose()
	public url: string;

	@IsArray()
	@IsString({ each: true })
	@Expose()
	public tags: string[];
}

export class AddDevLinkDto {
	@IsString()
	@IsNotEmpty()
	public title: string;

	@IsUrl()
	@IsNotEmpty()
	public url: string;

	@IsOptional()
	@IsString({ each: true })
	public tagList: string[];
}

export class SetDevLinkDto extends AddDevLinkDto {
	@IsInt()
	@Min(1)
	public idx: number;
}
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { SearchType } from './execution-statement.model';

export class AddExecutionStatementDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(200)
	public title: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(1000)
	public statement: string;

	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(500)
	public description: string | null = null;

	@IsOptional()
	@IsString({ each: true })
	public tagList: string[];
}

export class SetExecutionStatementDto extends AddExecutionStatementDto {
	@IsInt()
	@Min(1)
	public idx: number;
}

export class SearchExecutionStatementParam {
	@Type(() => Number)
	@IsEnum(SearchType)
	public type: SearchType;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	public page: number;

	@IsOptional()
	@MinLength(2)
	public title?: string;

	@IsOptional()
	@Transform(({ value }) => (value as string).split(','))
	@IsArray()
	public tagList?: string[];
}
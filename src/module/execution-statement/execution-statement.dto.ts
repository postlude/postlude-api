import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

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
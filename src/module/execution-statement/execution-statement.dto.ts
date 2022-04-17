import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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
	@MaxLength(500)
	public description: string;

	@IsOptional()
	@IsString({ each: true })
	public tagList: string[];
}
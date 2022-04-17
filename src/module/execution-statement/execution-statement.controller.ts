import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AddExecutionStatementDto, SetExecutionStatementDto } from './execution-statement.dto';
import { ExecutionStatementService } from './execution-statement.service';

@Controller('/execution-statement')
export class ExecutionStatementController {
	constructor(
		private readonly executionStatementService: ExecutionStatementService
	) {}

	@Get('/:idx')
	public getExecutionStatement(
		@Param('idx', ParseIntPipe) executionStatementIdx: number
	) {
		return this.executionStatementService.getExecutionStatement(executionStatementIdx);
	}

	@Post('/')
	public addExecutionStatement(
		@Body() executionStatementDto: AddExecutionStatementDto
	) {
		this.executionStatementService.addExecutionStatement(executionStatementDto);
	}

	@Put('/')
	public setExecutionStatement(
		@Body() executionStatementDto: SetExecutionStatementDto
	) {
		this.executionStatementService.setExecutionStatement(executionStatementDto);
	}
}
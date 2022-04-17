import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AddExecutionStatementDto } from './execution-statement.dto';
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
}
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LoginRequired } from '../auth/guard/jwt.guard';
import { AddExecutionStatementDto, SearchExecutionStatementParam, SetExecutionStatementDto } from './execution-statement.dto';
import { ExecutionStatementService } from './execution-statement.service';

@Controller('/execution-statement')
export class ExecutionStatementController {
	constructor(
		private readonly executionStatementService: ExecutionStatementService
	) {}

	@Get('/list')
	public searchExecutionStatement(
		@Query() searchExecutionStatementParam: SearchExecutionStatementParam
	) {
		return this.executionStatementService.getExecutionStatementList(searchExecutionStatementParam);
	}

	@Get('/:idx')
	public getExecutionStatement(
		@Param('idx', ParseIntPipe) executionStatementIdx: number
	) {
		return this.executionStatementService.getExecutionStatement(executionStatementIdx);
	}

	@Delete('/:idx')
	@UseGuards(LoginRequired)
	public removeExecutionStatement(
		@Param('idx', ParseIntPipe) executionStatementIdx: number
	) {
		this.executionStatementService.removeExecutionStatement(executionStatementIdx);
	}

	@Post('/')
	@UseGuards(LoginRequired)
	public addExecutionStatement(
		@Body() executionStatementDto: AddExecutionStatementDto
	) {
		this.executionStatementService.addExecutionStatement(executionStatementDto);
	}

	@Put('/')
	@UseGuards(LoginRequired)
	public setExecutionStatement(
		@Body() executionStatementDto: SetExecutionStatementDto
	) {
		this.executionStatementService.setExecutionStatement(executionStatementDto);
	}
}
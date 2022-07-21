import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LoginRequired } from '../auth/guard/jwt.guard';
import { AddDevLinkDto, SearchDevLinkParam, SetDevLinkDto } from './dev-link.dto';
import { DevLinkService } from './dev-link.service';

@Controller('/dev-link')
export class DevLinkController {
	constructor(
		private readonly devLinkService: DevLinkService
	) {}

	@Get('/list')
	public searchDevLink(
		@Query() searchDevLinkParam: SearchDevLinkParam
	) {
		return this.devLinkService.getDevLinkList(searchDevLinkParam);
	}

	@Get('/:idx')
	public getDevLink(
		@Param('idx', ParseIntPipe) devLinkIdx: number
	) {
		return this.devLinkService.getDevLink(devLinkIdx);
	}

	@Delete('/:idx')
	@UseGuards(LoginRequired)
	public removeDevLink(
		@Param('idx', ParseIntPipe) devLinkIdx: number
	) {
		return this.devLinkService.removeDevLink(devLinkIdx);
	}

	@Post('/')
	@UseGuards(LoginRequired)
	public addDevLink(
		@Body() devLinkDto: AddDevLinkDto
	) {
		this.devLinkService.addDevLink(devLinkDto);
	}

	@Put('/')
	@UseGuards(LoginRequired)
	public setDevLink(
		@Body() devLinkDto: SetDevLinkDto
	) {
		this.devLinkService.setDevLink(devLinkDto);
	}
}
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LoginRequired } from '../auth/guard/jwt.guard';
import { AddDevLinkDto, SearchDevLinkQuery, SetDevLinkDto } from './dev-link.dto';
import { DevLinkService } from './dev-link.service';

@Controller('/dev-links')
export class DevLinkController {
	constructor(
		private readonly devLinkService: DevLinkService
	) {}

	@Get('/')
	public searchDevLink(
		@Query() query: SearchDevLinkQuery
	) {
		return this.devLinkService.search(query);
	}

	@Post('/')
	// @UseGuards(LoginRequired)
	public addDevLink(
		@Body() devLinkDto: AddDevLinkDto
	) {
		this.devLinkService.addDevLink(devLinkDto);
	}

	@Put('/')
	// @UseGuards(LoginRequired)
	public setDevLink(
		@Body() devLinkDto: SetDevLinkDto
	) {
		this.devLinkService.setDevLink(devLinkDto);
	}

	@Delete('/:id')
	// @UseGuards(LoginRequired)
	public removeDevLink(
		@Param('id', ParseIntPipe) devLinkId: number
	) {
		return this.devLinkService.removeDevLink(devLinkId);
	}
}
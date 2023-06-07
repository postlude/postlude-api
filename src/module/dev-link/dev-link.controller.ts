import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LoginRequired } from '../auth/guard/jwt.guard';
import { AddDevLinkDto, DevLinkDto, SearchDevLinkQuery, SetDevLinkDto } from './dev-link.dto';
import { DevLinkService } from './dev-link.service';

@Controller('/dev-links')
export class DevLinkController {
	constructor(
		private readonly devLinkService: DevLinkService
	) {}

	@Get('/')
	public async searchDevLink(
		@Query() query: SearchDevLinkQuery
	) {
		return await this.devLinkService.search(query);
	}

	@Post('/')
	// @UseGuards(LoginRequired)
	public async addDevLink(
		@Body() devLinkDto: Omit<DevLinkDto, 'id'>
	) {
		await this.devLinkService.addDevLink(devLinkDto);
	}

	@Put('/')
	// @UseGuards(LoginRequired)
	public async setDevLink(
		@Body() devLinkDto: SetDevLinkDto
	) {
		await this.devLinkService.setDevLink(devLinkDto);
	}

	@Delete('/:id')
	@UseGuards(LoginRequired)
	public async removeDevLink(
		@Param('id', ParseIntPipe) devLinkId: number
	) {
		return await this.devLinkService.removeDevLink(devLinkId);
	}
}
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LoginRequired } from '../auth/guard/jwt.guard';
import { DevLinkDto, SearchDevLinkQuery } from './dev-link.dto';
import { DevLinkService } from './dev-link.service';

@Controller('/dev-links')
export class DevLinkController {
	constructor(
		private readonly devLinkService: DevLinkService
	) {}

	@Post('/')
	@UseGuards(LoginRequired)
	public async addDevLink(
		@Body() devLinkDto: DevLinkDto
	) {
		return await this.devLinkService.addDevLink(devLinkDto);
	}

	@Get('/')
	public async searchDevLinks(
		@Query() query: SearchDevLinkQuery
	) {
		return await this.devLinkService.search(query);
	}

	@Get('/tags')
	public async getAllDevLinkTags() {
		return await this.devLinkService.getAllTags();
	}

	@Get('/:id')
	public async getDevLink(
		@Param('id', ParseIntPipe) devLinkId: number
	) {
		return await this.devLinkService.getDevLink(devLinkId);
	}

	@Put('/:id')
	@UseGuards(LoginRequired)
	public async setDevLink(
		@Param('id', ParseIntPipe) devLinkId: number,
		@Body() devLinkDto: DevLinkDto
	) {
		await this.devLinkService.setDevLink(devLinkId, devLinkDto);
	}

	@Delete('/:id')
	@UseGuards(LoginRequired)
	public async removeDevLink(
		@Param('id', ParseIntPipe) devLinkId: number
	) {
		return await this.devLinkService.removeDevLink(devLinkId);
	}
}
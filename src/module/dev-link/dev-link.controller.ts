import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
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
	@UseGuards(JwtAuthGuard)
	public removeDevLink(
		@Param('idx', ParseIntPipe) devLinkIdx: number
	) {
		return this.devLinkService.removeDevLink(devLinkIdx);
	}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	public addDevLink(
		@Body() devLinkDto: AddDevLinkDto
	) {
		this.devLinkService.addDevLink(devLinkDto);
	}

	@Put('/')
	@UseGuards(JwtAuthGuard)
	public setDevLink(
		@Body() devLinkDto: SetDevLinkDto
	) {
		this.devLinkService.setDevLink(devLinkDto);
	}
}
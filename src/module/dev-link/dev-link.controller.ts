import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SearchDevLinkParam } from './dev-link.dto';
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
}
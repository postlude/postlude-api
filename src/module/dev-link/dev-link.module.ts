import { Module } from '@nestjs/common';
import { DevLinkController } from './dev-link.controller';
import { DevLinkService } from './dev-link.service';

@Module({
	controllers: [DevLinkController],
	providers: [DevLinkService]
})
export class DevLinkModule {}

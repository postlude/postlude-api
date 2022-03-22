import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevLinkController } from './dev-link.controller';
import { DevLinkService } from './dev-link.service';
import { DevLinkRepository } from './repository/dev-link.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			DevLinkRepository
		])
	],
	controllers: [DevLinkController],
	providers: [DevLinkService]
})
export class DevLinkModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from '../../database/repository/tag.repository';
import { DevLinkController } from './dev-link.controller';
import { DevLinkService } from './dev-link.service';
import { DevLinkTagRepository } from '../../database/repository/dev-link-tag.repository';
import { DevLinkRepository } from '../../database/repository/dev-link.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			DevLinkRepository,
			DevLinkTagRepository,
			TagRepository
		])
	],
	controllers: [DevLinkController],
	providers: [DevLinkService]
})
export class DevLinkModule {}

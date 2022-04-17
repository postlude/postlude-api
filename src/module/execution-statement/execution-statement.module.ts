import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionStatementTagRepository } from 'src/database/repository/execution-statement-tag.repository';
import { ExecutionStatementRepository } from 'src/database/repository/execution-statement.repository';
import { TagRepository } from 'src/database/repository/tag.repository';
import { ExecutionStatementController } from './execution-statement.controller';
import { ExecutionStatementService } from './execution-statement.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ExecutionStatementRepository,
			ExecutionStatementTagRepository,
			TagRepository
		])
	],
	controllers: [ExecutionStatementController],
	providers: [ExecutionStatementService]
})
export class ExecutionStatementModule {}

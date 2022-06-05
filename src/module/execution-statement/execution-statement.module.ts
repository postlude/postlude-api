import { Module } from '@nestjs/common';
import { ExecutionStatementController } from './execution-statement.controller';
import { ExecutionStatementService } from './execution-statement.service';

@Module({
	controllers: [ExecutionStatementController],
	providers: [ExecutionStatementService]
})
export class ExecutionStatementModule {}

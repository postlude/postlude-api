import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { DatbaseModule } from './database/database.module';
import { DevLinkModule } from './module/dev-link/dev-link.module';
import { ExecutionStatementModule } from './module/execution-statement/execution-statement.module';
import { UserModule } from './module/user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['src/config/local.env'],
			isGlobal: true
		}),
		DatbaseModule,
		DevLinkModule,
		ExecutionStatementModule,
		UserModule
	],
	providers: [
		// DTO에서 class-validator 사용하기 위해 필요
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({ transform: true })
		}
	]
})
export class AppModule {}

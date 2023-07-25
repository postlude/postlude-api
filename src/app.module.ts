import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { DatbaseModule } from './database/database.module';
import { AuthModule } from './module/auth/auth.module';
import { DevLinkModule } from './module/dev-link/dev-link.module';
import { UserModule } from './module/user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['src/config/local.env'],
			isGlobal: true
		}),
		AuthModule,
		DatbaseModule,
		UserModule,
		DevLinkModule
	],
	controllers: [AppController],
	providers: [
		// DTO에서 class-validator 사용하기 위해 필요
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({ transform: true })
		}
	]
})
export class AppModule {}

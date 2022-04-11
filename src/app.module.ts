import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevLinkTag } from './database/entity/dev-link-tag.entity';
import { DevLink } from './database/entity/dev-link.entity';
import { Tag } from './database/entity/tag.entity';
import { DevLinkModule } from './module/dev-link/dev-link.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'postlude',
			entities: [
				DevLink,
				Tag,
				DevLinkTag
			],
			logging: true
			// synchronize: true
		}),
		DevLinkModule
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

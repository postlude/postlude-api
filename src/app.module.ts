import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevLinkModule } from './module/dev-link/dev-link.module';
import { DevLink } from './entity/dev-link.entity';
import { Tag } from './entity/tag.entity';
import { DevLinkTag } from './entity/dev-link-tag.entity';

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
	]
})
export class AppModule {}

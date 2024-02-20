import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { MySqlConfig } from 'src/config/config.model';
import { DevLinkTagRepository } from './repository/dev-link-tag.repository';
import { DevLinkRepository } from './repository/dev-link.repository';
import { UserRepository } from './repository/user.repository';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ ConfigService ],
			useFactory: (configService: ConfigService<MySqlConfig>) => {
				return {
					type: 'mysql',
					host: configService.get('MYSQL_HOST', { infer: true }),
					port: configService.get('MYSQL_PORT', { infer: true }),
					username: configService.get('MYSQL_USERNAME', { infer: true }),
					password: configService.get('MYSQL_PASSWORD', { infer: true }),
					database: configService.get('MYSQL_DATABASE', { infer: true }),
					entities: [ join(__dirname, '/**/*.entity.js') ],
					logging: true
					// synchronize: false,
				};
			}
		}),
		TypeOrmModule.forFeature([
			UserRepository,
			DevLinkRepository,
			DevLinkTagRepository
		])
	],
	exports: [ TypeOrmModule ]
})
export class DatbaseModule {}
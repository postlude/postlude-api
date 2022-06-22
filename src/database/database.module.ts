import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DevLinkRepository } from './repository/dev-link.repository';
import { DevLinkTagRepository } from './repository/dev-link-tag.repository';
import { UserRepository } from './repository/user.repository';
import { ExecutionStatementRepository } from './repository/execution-statement.repository';
import { ExecutionStatementTagRepository } from './repository/execution-statement-tag.repository';
import { TagRepository } from './repository/tag.repository';
import { MySqlConfig } from 'src/config/config.model';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService<MySqlConfig>) => {
				console.log(configService.get('MYSQL_HOST', { infer: true }));
				return {
					type: 'mysql',
					host: configService.get('MYSQL_HOST', { infer: true }),
					port: configService.get('MYSQL_PORT', { infer: true }),
					username: configService.get('MYSQL_USERNAME', { infer: true }),
					password: configService.get('MYSQL_PASSWORD', { infer: true }),
					database: configService.get('MYSQL_DATABASE', { infer: true }),
					entities: [join(__dirname, '/**/*.entity.js')],
					logging: true
					// synchronize: false,
				};
			}
		}),
		TypeOrmModule.forFeature([
			UserRepository,
			DevLinkRepository,
			DevLinkTagRepository,
			ExecutionStatementRepository,
			ExecutionStatementTagRepository,
			TagRepository
		])
	],
	exports: [TypeOrmModule]
})
export class DatbaseModule {}
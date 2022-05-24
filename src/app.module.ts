import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlConfig } from './config/config.model';
import { DevLinkTag } from './database/entity/dev-link-tag.entity';
import { DevLink } from './database/entity/dev-link.entity';
import { ExecutionStatementTag } from './database/entity/execution-statement-tag.entity';
import { ExecutionStatement } from './database/entity/execution-statement.entity';
import { Tag } from './database/entity/tag.entity';
import { User } from './database/entity/user.entity';
import { DevLinkModule } from './module/dev-link/dev-link.module';
import { ExecutionStatementModule } from './module/execution-statement/execution-statement.module';
import { UserModule } from './module/user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['src/config/local.env'],
			isGlobal: true
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService<MySqlConfig>) => ({
				type: 'mysql',
				host: configService.get('MYSQL_HOST', { infer: true }),
				port: configService.get('MYSQL_PORT', { infer: true }),
				username: configService.get('MYSQL_USERNAME', { infer: true }),
				password: configService.get('MYSQL_PASSWORD', { infer: true }),
				database: configService.get('MYSQL_DATABASE', { infer: true }),
				// entities: [join(__dirname, '/**/*.entity.js')],
				entities: [
					DevLink,
					Tag,
					DevLinkTag,
					ExecutionStatement,
					ExecutionStatementTag,
					User
				],
				logging: true
				// synchronize: true,
			})
		}),
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

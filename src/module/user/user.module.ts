import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from 'src/config/config.model';
import { UserRepository } from 'src/database/repository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [
		AuthModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService<JwtConfig>) => ({
				secret: configService.get('JWT_SECRET', { infer: true }),
				signOptions: { expiresIn: '1d' }
			})
		}),
		TypeOrmModule.forFeature([
			UserRepository
		])
	],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
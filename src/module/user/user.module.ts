import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/config.model';
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
		})
	],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
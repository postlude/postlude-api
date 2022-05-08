import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/database/repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [
		AuthModule,
		JwtModule.register({
			secret: 'local',
			signOptions: { expiresIn: '60s' }
		}),
		TypeOrmModule.forFeature([
			UserRepository
		])
	],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repository/user.repository';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
	imports: [
		PassportModule,
		TypeOrmModule.forFeature([
			UserRepository
		])
	],
	providers: [AuthService, LocalStrategy],
	exports: [AuthService]
})
export class AuthModule {}
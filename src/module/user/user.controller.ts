import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.model';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { SignDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
	constructor(
		private readonly userService: UserService
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('/auth-test')
	public authTest(
		@Auth() user: AuthUser
	) {
		return user;
	}

	@Post('/')
	public async signUp(
		@Body() param: SignDto
	) {
		return await this.userService.signUp(param);
	}

	@Post('/sign-in')
	public async signIn(
		@Body() param: SignDto
	) {
		return await this.userService.signIn(param);
	}
}
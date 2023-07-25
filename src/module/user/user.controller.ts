import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUser } from '../auth/auth.model';
import { AuthUser } from '../auth/decorator/auth.decorator';
import { LoginRequired } from '../auth/guard/jwt.guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
	constructor(
		private readonly userService: UserService
	) {}

	@UseGuards(LoginRequired)
	@Get('/auth-test')
	public authTest(
		@AuthUser() user: LoginUser
	) {
		return user;
	}

	@Post('/')
	public async signUp(
		@Body() param: UserDto
	) {
		return await this.userService.signUp(param);
	}

	@Post('/sign-in')
	public async signIn(
		@Body() param: UserDto
	) {
		return await this.userService.signIn(param);
	}
}
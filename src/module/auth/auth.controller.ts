import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequired } from './guard/jwt.guard';
import { AuthUser } from './decorator/auth.decorator';
import { LoginUser } from './auth.model';
import { AuthDto } from './auth.dto';

@Controller('/auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}

	@UseGuards(LoginRequired)
	@Get('/test')
	public authTest(
		@AuthUser() user: LoginUser
	) {
		return user;
	}

	@Post('/sign-in')
	public async signIn(
		@Body() param: AuthDto
	) {
		return await this.authService.signIn(param);
	}
}
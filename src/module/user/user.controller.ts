/* eslint-disable */
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('/user')
export class UserController {
	constructor(
		private readonly authService: AuthService
	) {}

	@UseGuards(AuthGuard('local'))
	// @UseGuards(LocalAuthGuard)
	@Post('/login')
	login(@Request() req) {
		console.log('UserController /login');
		// return req.user;
		return this.authService.login(req.user);
	}

	@UseGuards(AuthGuard('jwt'))
  	@Get('/profile')
  	getProfile(@Request() req) {
    	return req.user;
  	}
}
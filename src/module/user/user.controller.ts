import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/user')
export class UserController {
	/* eslint-disable */
	@UseGuards(AuthGuard('local'))
	// @UseGuards(LocalAuthGuard)
	@Post('/login')
	login(@Request() req) {
		console.log('UserController /login');
		return req.user;
	}
}
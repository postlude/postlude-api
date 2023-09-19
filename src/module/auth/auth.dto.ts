import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
	@IsEmail()
	public email: string;

	@IsString()
	@IsNotEmpty()
	public password: string;
}
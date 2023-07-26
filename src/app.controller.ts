import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('/health')
	public checkHealth() {
		console.log('call health');
		return 'ok';
	}
}
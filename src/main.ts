import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	);

	const port = 3000;

	await app.listen(port);

	console.log('[POSTLUDE API]');
	// console.log(`ENV : ${ENV}`);
	console.log(`PORT : ${port}`);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
// import {
// 	FastifyAdapter,
// 	NestFastifyApplication
// } from '@nestjs/platform-fastify';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app.module';

async function bootstrap() {
	// Initialize cls-hooked
	initializeTransactionalContext();

	// const app = await NestFactory.create<NestFastifyApplication>(
	// 	AppModule,
	// 	new FastifyAdapter()
	// );
	const app = await NestFactory.create(AppModule);

	const port = 3000;

	app.enableCors({
		origin: [ /localhost/, /postlude.me/ ]
	});

	await app.listen(port);

	console.log('[POSTLUDE API]');
	console.log(`PORT : ${port}`);
}

bootstrap();

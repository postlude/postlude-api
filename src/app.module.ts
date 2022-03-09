import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'postlude'
			// entities: [],
			// synchronize: true
		})
	]
//   controllers: [AppController],
//   providers: [AppService],
})
export class AppModule {}

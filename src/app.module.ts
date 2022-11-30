import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Post } from './typeorm/entities/Post'
import { Profile } from './typeorm/entities/Profile'
import { User } from './typeorm/entities/User'
import { UsersModule } from './users/users.module'
import { PetsModule } from './pets/pets.module'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver } from '@nestjs/apollo'
import { Pet } from './pets/pets.entity'
import { OwnersModule } from './owners/owners.module'
import { Owner } from './owners/entities/owner.entity'

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			driver: ApolloDriver
		}),

		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'Artyom_2006',
			database: 'test',
			entities: [Pet, Post, Profile, User, Owner],
			synchronize: true
		}),
		UsersModule,
		PetsModule,
		OwnersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}

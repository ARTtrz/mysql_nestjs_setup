import {
	Body,
	Injectable,
	Param,
	ParseIntPipe,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from 'src/typeorm/entities/Post'
import { Profile } from 'src/typeorm/entities/Profile'
import { User } from 'src/typeorm/entities/User'
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto'
import {
	CreateUserParams,
	CreateUserPostParams,
	CreateUserProfileParams,
	UpdateUserParams
} from 'src/utils/types'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Profile)
		private profileRepository: Repository<Profile>,
		@InjectRepository(Post)
		private postRepository: Repository<Post>
	) {}

	findUsers() {
		return this.userRepository.find({
			relations: ['profile', 'posts']
		})
	}

	createUser(userDetails: CreateUserParams) {
		const newUser = this.userRepository.create({
			...userDetails,
			createdAt: new Date()
		})
		return this.userRepository.save(newUser)
	}

	updateUserById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDetails: UpdateUserParams
	) {
		return this.userRepository.update({ id }, { ...updateUserDetails })
	}

	async delete(@Param('id', ParseIntPipe) id: number) {
		return this.userRepository.delete({ id })
	}

	async createUserProfile(
		id: number,
		createUserProfileDetails: CreateUserProfileParams
	) {
		const user = await this.userRepository.findOneBy({ id })

		if (!user)
			throw new HttpException(
				'User nor found, cannot create profile',
				HttpStatus.BAD_REQUEST
			)
		const newProfile = this.profileRepository.create(
			createUserProfileDetails
		)
		const savedProfile = await this.profileRepository.save(newProfile)
		user.profile = savedProfile
		return this.userRepository.save(user)
	}

	async createUserPost(
		id: number,
		createUserPostDetails: CreateUserPostParams
	) {
		const user = await this.userRepository.findOneBy({ id })

		if (!user)
			throw new HttpException(
				'User nor found, cannot create profile',
				HttpStatus.BAD_REQUEST
			)

		const newPost = this.postRepository.create({
			...createUserPostDetails,
			user
		})
		return this.postRepository.save(newPost)
	}
}

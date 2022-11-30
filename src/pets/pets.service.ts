import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Owner } from '../owners/entities/owner.entity'
import { Repository } from 'typeorm'
import { CreatePetInput } from './dto/create-pet.input'
import { Pet } from './pets.entity'
import { OwnersService } from 'src/owners/owners.service'

@Injectable()
export class PetsService {
	constructor(
		@InjectRepository(Pet) private petsRepository: Repository<Pet>,
		private ownersRepository: OwnersService
	) {}

	createPet(createPetInput: CreatePetInput): Promise<Pet> {
		const newPet = this.petsRepository.create(createPetInput) // newPet = new Pet(); new.
		return this.petsRepository.save(newPet)
	}

	async findAll(): Promise<Pet[]> {
		return this.petsRepository.find() // SELECT * from pet
	}

	findOne(id: number): Promise<Pet> {
		return this.petsRepository.findOneOrFail({
			where: {
				id: id
			}
		})
	}

	getOwner(ownerId: number): Promise<Owner> {
		return this.ownersRepository.findOne(ownerId)
	}
}

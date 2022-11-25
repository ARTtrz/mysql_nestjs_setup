import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
	OneToMany
} from 'typeorm'
import { Post } from './Post'
import { Profile } from './Profile'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ unique: true, length: 255, type: 'varchar' })
	username: string

	@Column()
	password: string

	@Column()
	createdAt: Date

	@Column({ nullable: true })
	authStrategy: string

	@OneToOne(() => Profile)
	@JoinColumn()
	profile: Profile

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[]

}

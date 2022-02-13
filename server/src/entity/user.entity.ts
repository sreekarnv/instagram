import { Field, ObjectType } from 'type-graphql';
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
} from 'typeorm';
import * as argon2 from 'argon2';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	name?: string;

	@Field()
	@Column({ default: false })
	hasRegistered?: boolean;

	@Field({ nullable: true })
	@Column({ default: null })
	phone?: string;

	@Field({ nullable: true })
	@Column({ default: '/uploads/avatars/avatar-1.png' })
	photo?: string;

	@Field()
	@CreateDateColumn()
	createdAt!: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt!: Date;

	@BeforeInsert()
	async hashPassword() {
		this.password = await argon2.hash(this.password, { saltLength: 14 });
	}

	async verifyPassword(hash: string, plain: string): Promise<boolean> {
		return await argon2.verify(hash, plain);
	}
}

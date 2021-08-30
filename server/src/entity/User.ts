import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as argon2 from 'argon2';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryColumn()
	id!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	photo?: string;

	@Field()
	@Column({ unique: true, length: 255 })
	email!: string;

	@Field()
	@Column({ length: 255 })
	name!: string;

	@Column()
	password!: string;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt!: Date;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}

	@BeforeInsert()
	async hashPassword() {
		this.password = await argon2.hash(this.password, { hashLength: 15 });
	}

	async verifyPassword(hash: string, input: string) {
		return await argon2.verify(hash, input);
	}
}

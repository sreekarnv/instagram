import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field()
	@PrimaryColumn()
	id!: string;

	@Field()
	@Column({ type: 'text' })
	description!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	photo?: string;

	@Column()
	userId!: string;

	@Field(() => User)
	@ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
	@JoinColumn()
	user!: string;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt!: string;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt!: string;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}

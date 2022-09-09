import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Field()
	@Column('text')
	description!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	photo?: string;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt!: Date;

	@Field()
	@Column()
	userId!: string;

	@Field(() => User)
	@ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
	@JoinColumn()
	user!: string;
}

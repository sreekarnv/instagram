import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Likes extends BaseEntity {
	@Field()
	@PrimaryColumn()
	id!: string;

	@Field()
	@Column()
	userId!: string;

	@Field()
	@Column()
	postId!: String;
}

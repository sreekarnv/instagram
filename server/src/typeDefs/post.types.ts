import { Field, InputType, ObjectType } from 'type-graphql';
import { Post } from '../entity/post.entity';

@InputType('CreatePostInput')
export class CreatePostInputType {
	@Field()
	description!: string;

	@Field()
	photo!: string;
}

@ObjectType('PostsResponseType')
export class PostsResponseType {
	@Field()
	count!: number;

	@Field()
	hasMore!: boolean;

	@Field(() => [Post])
	posts!: Post[];
}

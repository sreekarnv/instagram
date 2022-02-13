import { Field, InputType, ObjectType } from 'type-graphql';
import { Post } from '../entity/post.entity';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../types';

@InputType('CreatePostInput')
export class CreatePostInputType {
	@Field()
	description!: string;

	@Field(() => GraphQLUpload)
	photo!: Upload;
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

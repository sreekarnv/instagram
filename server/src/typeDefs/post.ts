import { InputType, Field, ObjectType } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';

import { Upload } from '../types';
import { Post } from '../entity/Post';

@InputType()
export class CreatePostInputType {
	@Field()
	description!: string;

	@Field(() => GraphQLUpload)
	photo!: Upload;
}

@ObjectType()
export class PostsResponse {
	@Field({ defaultValue: true })
	hasNext!: boolean;

	@Field(() => [Post], { defaultValue: [] })
	posts!: Post[];
}

import { InputType, Field } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreatePostInputType {
	@Field()
	description!: string;

	@Field(() => GraphQLUpload)
	photo!: typeof GraphQLUpload;
}

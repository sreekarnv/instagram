import { InputType, Field } from 'type-graphql';

@InputType()
export class CreatePostInputType {
	@Field()
	description!: string;

	@Field()
	photo!: string;
}

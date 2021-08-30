import { InputType, Field } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';

import { Upload } from '../types';

@InputType()
export class CreatePostInputType {
	@Field()
	description!: string;

	@Field(() => GraphQLUpload)
	photo!: Upload;
}

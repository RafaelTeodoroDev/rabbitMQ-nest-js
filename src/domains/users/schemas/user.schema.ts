import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FileSchema, File } from 'src/domains/file/schema/file.schema';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  age: number;

  @Prop({ type: FileSchema })
  avatar: File;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

// file.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File {
  @Prop()
  name: string;

  @Prop()
  path: string;

  @Prop()
  owner: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop()
  base64: string;
}

export type FileDocument = File & Document;

export const FileSchema = SchemaFactory.createForClass(File);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Agency } from 'src/agency/schemas/agency.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Agency' })
  agency: Agency;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

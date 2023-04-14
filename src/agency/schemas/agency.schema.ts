import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AgencyDocument = Agency & Document;

@Schema()
export class Agency {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  type: string;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);

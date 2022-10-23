import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  img: string;
  @Prop({ required: true })
  description: string;
  @Prop({ type: [String], required: true })
  tags: string[];
  @Prop({ required: true })
  link: string;
  @Prop({ required: true })
  color: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

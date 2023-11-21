import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes } from 'mongoose';
import { ActiveInactiveEnum } from '../movies.enum';


@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'movies',
})
export class Movies {

  @Prop({
    trim: true,
    required: false,
    type: String,
    enum: ActiveInactiveEnum,
    default: 'Active',
  })
  status?: ActiveInactiveEnum;

  @Prop({ trim: true, required: true, type: String })
  title: string;

  @Prop({ trim: true, required: true, type: String })
  genre: string;

  @Prop({ trim: true, required: true, type: Number })
  rating: string;

  @Prop({ trim: true, required: true, type: String })
  streaming_link: string;

}
export const MoviesSchema = SchemaFactory.createForClass(Movies);

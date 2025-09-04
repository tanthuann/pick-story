import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDailyPickDocument = UserDailyPick & Document;

@Schema({ timestamps: true })
export class UserDailyPick {
  @Prop({ required: true, trim: true })
  userId: string; // This could be IP address or user identifier

  @Prop({ type: Types.ObjectId, ref: 'Story', required: true })
  storyId: Types.ObjectId;

  @Prop({ required: true })
  pickDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserDailyPickSchema = SchemaFactory.createForClass(UserDailyPick);

// Create index to ensure one pick per user per day
UserDailyPickSchema.index({ userId: 1, pickDate: 1 }, { unique: true });

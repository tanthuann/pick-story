import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reply, ReplyDocument } from '../schemas/reply.schema';
import { Story, StoryDocument } from '../schemas/story.schema';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class RepliesService {
  constructor(
    @InjectModel(Reply.name) private replyModel: Model<ReplyDocument>,
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
  ) {}

  async create(createReplyDto: CreateReplyDto): Promise<Reply> {
    // Create the reply
    const createdReply = new this.replyModel(createReplyDto);
    const savedReply = await createdReply.save();

    // Update the story's reply count
    await this.storyModel.findByIdAndUpdate(
      createReplyDto.storyId,
      { $inc: { replyCount: 1 } }
    ).exec();

    return savedReply;
  }

  async findByStory(storyId: string): Promise<Reply[]> {
    return this.replyModel
      .find({ storyId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Reply | null> {
    return this.replyModel.findById(id).exec();
  }

  async countByStory(storyId: string): Promise<number> {
    return this.replyModel.countDocuments({ storyId }).exec();
  }
}

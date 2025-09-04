import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Story, StoryDocument } from '../schemas/story.schema';
import { Reply, ReplyDocument } from '../schemas/reply.schema';
import { UserDailyPick, UserDailyPickDocument } from '../schemas/user-daily-pick.schema';
import { CreateStoryDto } from './dto/create-story.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
    @InjectModel(Reply.name) private replyModel: Model<ReplyDocument>,
    @InjectModel(UserDailyPick.name) private userDailyPickModel: Model<UserDailyPickDocument>,
  ) {}

  async create(createStoryDto: CreateStoryDto): Promise<Story> {
    const createdStory = new this.storyModel(createStoryDto);
    return createdStory.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ stories: Story[], total: number, page: number, totalPages: number }> {
    const skip = (page - 1) * limit;
    
    const [stories, total] = await Promise.all([
      this.storyModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.storyModel.countDocuments().exec(),
    ]);

    return {
      stories,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Story | null> {
    return this.storyModel.findById(id).exec();
  }

  async getStoryWithReplies(storyId: string): Promise<{ story: Story | null, replies: Reply[] }> {
    const [story, replies] = await Promise.all([
      this.storyModel.findById(storyId).exec(),
      this.replyModel.find({ storyId }).sort({ createdAt: -1 }).exec(),
    ]);

    return { story, replies };
  }

  async getRandomStoryForUser(userId: string): Promise<Story> {
    // Check if user already picked a story today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingPick = await this.userDailyPickModel.findOne({
      userId,
      pickDate: { $gte: today }
    }).exec();

    if (existingPick) {
      throw new Error('Already picked a story today');
    }

    // Get all stories that haven't been picked by this user today
    const pickedStoryIds = await this.userDailyPickModel
      .find({ userId, pickDate: { $gte: today } })
      .distinct('storyId')
      .exec();

    // Get a random story that hasn't been picked
    const availableStories = await this.storyModel
      .find({ _id: { $nin: pickedStoryIds } })
      .exec();

    if (availableStories.length === 0) {
      throw new Error('No stories available');
    }

    const randomIndex = Math.floor(Math.random() * availableStories.length);
    const selectedStory = availableStories[randomIndex];

    // Record the pick
    await this.userDailyPickModel.create({
      userId,
      storyId: selectedStory._id,
      pickDate: today
    });

    return selectedStory;
  }
}

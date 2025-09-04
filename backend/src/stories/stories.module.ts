import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { Story, StorySchema } from '../schemas/story.schema';
import { Reply, ReplySchema } from '../schemas/reply.schema';
import { UserDailyPick, UserDailyPickSchema } from '../schemas/user-daily-pick.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Story.name, schema: StorySchema },
      { name: Reply.name, schema: ReplySchema },
      { name: UserDailyPick.name, schema: UserDailyPickSchema },
    ]),
  ],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}

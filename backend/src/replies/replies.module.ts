import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';
import { Reply, ReplySchema } from '../schemas/reply.schema';
import { Story, StorySchema } from '../schemas/story.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reply.name, schema: ReplySchema },
      { name: Story.name, schema: StorySchema },
    ]),
  ],
  controllers: [RepliesController],
  providers: [RepliesService],
  exports: [RepliesService],
})
export class RepliesModule {}

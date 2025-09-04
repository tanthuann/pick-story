import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  async create(@Body() createReplyDto: CreateReplyDto) {
    try {
      return await this.repliesService.create(createReplyDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create reply',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('story/:storyId')
  async findByStory(@Param('storyId') storyId: string) {
    try {
      return await this.repliesService.findByStory(storyId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch replies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const reply = await this.repliesService.findOne(id);
      if (!reply) {
        throw new HttpException('Reply not found', HttpStatus.NOT_FOUND);
      }
      return reply;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch reply',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

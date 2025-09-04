import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query,
  HttpException,
  HttpStatus,
  Req
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import type { Request } from 'express';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  async create(@Body() createStoryDto: CreateStoryDto) {
    try {
      return await this.storiesService.create(createStoryDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create story',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    try {
      return await this.storiesService.findAll(Number(page), Number(limit));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch stories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('random')
  async getRandomStory(@Req() request: Request) {
    try {
      // Use IP address as user identifier for daily limit
      const userId = request.ip || 'anonymous';
      return await this.storiesService.getRandomStoryForUser(userId);
    } catch (error) {
      if (error.message === 'Already picked a story today') {
        throw new HttpException(
          'You have already picked a story today. Come back tomorrow!',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw new HttpException(
        'Failed to get random story',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const story = await this.storiesService.findOne(id);
      if (!story) {
        throw new HttpException('Story not found', HttpStatus.NOT_FOUND);
      }
      return story;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch story',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/replies')
  async getStoriesWithReplies(@Param('id') id: string) {
    try {
      return await this.storiesService.getStoryWithReplies(id);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch story with replies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

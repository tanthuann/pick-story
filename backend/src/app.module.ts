import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { RepliesModule } from './replies/replies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI || 'mongodb://pickstory_user:pickstory_password@localhost:27017/pick-story?authSource=pick-story',
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('MongoDB connected successfully');
          });
          connection.on('error', (error: any) => {
            console.error('MongoDB connection error:', error);
          });
          return connection;
        },
      }),
    }),
    StoriesModule,
    RepliesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

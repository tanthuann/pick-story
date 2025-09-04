import { IsNotEmpty, IsString, MinLength, MaxLength, IsMongoId } from 'class-validator';

export class CreateReplyDto {
  @IsNotEmpty()
  @IsMongoId()
  storyId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  author: string;
}

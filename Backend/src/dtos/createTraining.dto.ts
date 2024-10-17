import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateTrainingDto {
  @IsDate()
  date: Date;

  @IsNumber()
  duration: number;

  @IsString()
  @IsNotEmpty()
  progress: string;
}

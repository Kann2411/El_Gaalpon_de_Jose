import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { Repository } from 'typeorm';
import { CreateTrainingDto } from '../../dtos/createTraining.dto'; // Asegúrate de crear este DTO
import { User } from '../users/users.entity';

@Injectable()
export class TrainingRepository {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
  ) {}

  async createTraining(
    createTrainingDto: CreateTrainingDto,
    user: User,
  ): Promise<Training> {
    const training = this.trainingRepository.create({
      ...createTrainingDto,
      user,
    });

    try {
      await this.trainingRepository.save(training);
      return training;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Error creating training',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getTrainingsByUser(userId: string): Promise<Training[]> {
    try {
      return await this.trainingRepository.find({
        where: { user: { id: userId } },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Error getting trainings',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

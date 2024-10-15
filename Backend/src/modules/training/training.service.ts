import { Injectable } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { CreateTrainingDto } from '../../dtos/createTraining.dto'; // Asegúrate de crear este DTO
import { User } from '../users/users.entity';


@Injectable()
export class TrainingService {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  async createTraining(createTrainingDto: CreateTrainingDto, user: User) {
    return await this.trainingRepository.createTraining(createTrainingDto, user);
  }

  async getUserTrainings(userId: string) {
    return await this.trainingRepository.getTrainingsByUser(userId);
  }
}

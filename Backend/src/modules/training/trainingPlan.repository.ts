import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingPlan } from './trainingPlan.entity';
import { Repository } from 'typeorm';
import { CreateTrainingPlanDto } from 'src/dtos/createTrainingPlan.dto';
import { User } from '../users/users.entity';

@Injectable()
export class TrainingPlanRepository {
  constructor(
    @InjectRepository(TrainingPlan)
    private readonly trainingPlanRepository: Repository<TrainingPlan>,
  ) {}

  async createTrainingPlan(
    planDto: CreateTrainingPlanDto,
    coach: User,
  ): Promise<TrainingPlan> {
    const trainingPlan = this.trainingPlanRepository.create({
      ...planDto,
      coach,
    });

    try {
      await this.trainingPlanRepository.save(trainingPlan);
      return trainingPlan;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear el plan de entrenamiento',
      );
    }
  }

  async getAllTrainingPlans(): Promise<TrainingPlan[]> {
    return await this.trainingPlanRepository.find({ relations: ['coach'] });
  }
}

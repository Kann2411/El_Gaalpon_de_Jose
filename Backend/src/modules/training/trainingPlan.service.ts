import { Injectable } from '@nestjs/common';
import { TrainingPlanRepository } from './trainingPlan.repository';
import { CreateTrainingPlanDto } from '../../dtos/createTrainingPlan.dto'; 
import { User } from '../users/users.entity';


@Injectable()
export class TrainingPlanService {
  constructor(private readonly trainingPlanRepository: TrainingPlanRepository) {}

  async createTrainingPlan(planDto: CreateTrainingPlanDto, coach: User) {
    return await this.trainingPlanRepository.createTrainingPlan(planDto, coach);
  }

  async getAllTrainingPlans() {
    return await this.trainingPlanRepository.getAllTrainingPlans();
  }
}

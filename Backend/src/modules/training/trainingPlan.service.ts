import { Injectable } from '@nestjs/common';
import { TrainingPlanRepository } from './trainingPlan.repository';
import { CreateTrainingPlanDto } from '../../dtos/createTrainingPlan.dto';
import { User } from '../users/users.entity';

@Injectable()
export class TrainingPlanService {

  constructor(
    private readonly trainingPlanRepository: TrainingPlanRepository,
  ) {}

   createTrainingPlan(planDto: CreateTrainingPlanDto, coach: User) {
    return  this.trainingPlanRepository.createTrainingPlan(planDto, coach);
  }

   getAllTrainingPlans() {
    return  this.trainingPlanRepository.getAllTrainingPlans();
  }

  deleteTrainingPlans(id:string) {
    return this.trainingPlanRepository.deleteTrainingPlans(id);
  }
}

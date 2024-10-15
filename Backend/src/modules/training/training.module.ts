import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingRepository } from './training.repository';
import { Training } from './training.entity';
import { TrainingPlanController } from './trainingPlan.controller';
import { TrainingPlanService } from './trainingPlan.service';
import { TrainingPlanRepository } from './trainingPlan.repository';
import { TrainingPlan } from './trainingPlan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Training, TrainingPlan]),
  ],
  controllers: [TrainingController, TrainingPlanController],
  providers: [TrainingService, TrainingRepository, TrainingPlanService, TrainingPlanRepository],
})
export class TrainingModule {}

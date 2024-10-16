import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { TrainingPlanService } from './trainingPlan.service';
import { CreateTrainingPlanDto } from '../../dtos/createTrainingPlan.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('training-plans')
@UseGuards(AuthGuard)
@Roles(Role.Coach)
export class TrainingPlanController {
  constructor(private readonly trainingPlanService: TrainingPlanService) {}

  @Post()
  async create(@Body() createTrainingPlanDto: CreateTrainingPlanDto, @Request() req) {
    const coach = req.user;
    return await this.trainingPlanService.createTrainingPlan(createTrainingPlanDto, coach);
  }

  @Get()
  async getAll() {
    return await this.trainingPlanService.getAllTrainingPlans();
  }
}

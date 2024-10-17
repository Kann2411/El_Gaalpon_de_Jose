import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from '../../dtos/createTraining.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('trainings')
@UseGuards(AuthGuard)
@Roles(Role.User)
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  async create(@Body() createTrainingDto: CreateTrainingDto, @Request() req) {
    const user = req.user;
    return await this.trainingService.createTraining(createTrainingDto, user);
  }

  @Get()
  async getUserTrainings(@Request() req) {
    const userId = req.user.id;
    return await this.trainingService.getUserTrainings(userId);
  }
}

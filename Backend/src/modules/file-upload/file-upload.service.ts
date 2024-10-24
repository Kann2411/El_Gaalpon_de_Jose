import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingPlan } from '../training/trainingPlan.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    @InjectRepository(TrainingPlan)
    private readonly trainingPlanRepository: Repository<TrainingPlan>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async uploadImgProfile(userid: string, file: Express.Multer.File) {
    const user = await this.userRepository.findOneBy({ id: userid });
    if (!user) {
      throw new NotFoundException(`User ${userid} not found`);
    }

    const uploadImage = await this.fileRepository.uploadImage(file);

    await this.userRepository.update(userid, {
      imgUrl: uploadImage.secure_url,
    });

    const findUser = await this.userRepository.findOneBy({ id: userid });

    return findUser;
  }

  async updateClassImage(trainingId: string, file: Express.Multer.File) {
    const training = await this.trainingPlanRepository.findOneBy({
      id: trainingId,
    });
    if (!training) {
      throw new NotFoundException(`Training ${trainingId} not found`);
    }

    const uploadImage = await this.fileRepository.uploadImage(file);

    await this.trainingPlanRepository.update(trainingId, {
      file: uploadImage.secure_url,
    });

    const findUpdateImage = await this.trainingPlanRepository.findOneBy({
      id: trainingId,
    });

    return findUpdateImage;
  }
}

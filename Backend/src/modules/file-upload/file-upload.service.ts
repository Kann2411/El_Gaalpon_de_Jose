import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingPlan } from '../training/trainingPlan.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Class } from '../classes/classes.entity';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    @InjectRepository(TrainingPlan)
    private readonly trainingPlanRepository: Repository<TrainingPlan>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async uploadImgProfile(userid: string, file: Express.Multer.File) {
    const user = await this.userRepository.findOneBy({ id: userid });
    if (!user) {
      throw new HttpException(`User id ${userid} not found`, HttpStatus.NOT_FOUND);
    }

    const uploadImage = await this.fileRepository.uploadImage(file);

    await this.userRepository.update(userid, {
      imgUrl: uploadImage.secure_url,
    });

    const findUser = await this.userRepository.findOneBy({ id: userid });

    return findUser;
  }

  async updateClassImage(classId: string, file: Express.Multer.File) {
    const classInfo = await this.classRepository.findOneBy({
      id: classId,
    });

    if (!classInfo) {
      throw new HttpException(`class id ${classId} not found`, HttpStatus.NOT_FOUND);
    }
    const uploadImage = await this.fileRepository.uploadImage(file);

    await this.classRepository.update(classId, {
      image: uploadImage.secure_url,
    });

    const findUpdateImage = await this.classRepository.findOneBy({
      id: classId,
    });

    return findUpdateImage;
  }

  async updateTrainingPlanImage(trainingId: string, file: Express.Multer.File) {
    const training = await this.trainingPlanRepository.findOneBy({
      id: trainingId,
    });
    if (!training) {
      throw new HttpException(`Training ${trainingId} not found`, HttpStatus.NOT_FOUND);
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

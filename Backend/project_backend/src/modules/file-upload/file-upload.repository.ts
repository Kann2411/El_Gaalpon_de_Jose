import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository {
  async uploadImgProfile(id: string, file: Express.Multer.File) {}
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FileRepository {
  constructor(private readonly userRepository: UsersRepository) {}
  async uploadImgProfile(id: string, file: Express.Multer.File) {
    try {
      return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          { resource_type: 'auto' },
          async (error, result) => {
            if (error) {
              reject(new InternalServerErrorException('Error al subir la imagen a Cloudinary.'));
            } else {
              try {
                await this.userRepository.updateUserImage(id, result.secure_url);
                resolve(result.secure_url);
              } catch (err) {
                reject(err); 
              }
            }
          },
        );
        toStream(file.buffer).pipe(upload);
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`El usuario con id ${id} no fue encontrado.`);
      } else {
        throw new InternalServerErrorException('Error inesperado al subir la imagen.');
      }
    }
  }
}

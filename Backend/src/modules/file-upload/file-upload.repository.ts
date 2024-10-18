import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FileRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => (error ? reject(error) : resolve(result)),
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}

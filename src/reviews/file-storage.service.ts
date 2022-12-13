import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Blob } from 'buffer';

@Injectable()
export class FileStorageService {
  async saveFile(
    file: Blob,
    folder: string,
    fileName: string,
  ): Promise<string> {
    const uniqueFileName = `${Date.now()}-${fileName}`;
    const filePath = path.join(
      __dirname,
      '../../content',
      folder,
      uniqueFileName,
    );

    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    await fs.promises.writeFile(filePath, buffer);

    return `${folder}/${uniqueFileName}`;
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullFilePath = path.join(__dirname, '../../content', filePath);

    await fs.promises.unlink(fullFilePath);
  }
}

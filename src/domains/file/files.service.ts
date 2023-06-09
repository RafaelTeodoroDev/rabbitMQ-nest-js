import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './schema/file.schema';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  async getAvatarAndSave(
    userId: number,
    avatarUrl: string,
  ): Promise<string | File> {
    const filename = avatarUrl.split('/').pop();
    const filepath = `tmp/${filename}`;
    // Verifica se a filem já foi salva no banco de dados
    const file = await this.fileModel.findOne({
      owner: userId,
      path: avatarUrl,
    });

    if (file) {
      return file;
    }

    const response = await axios.get(avatarUrl, {
      responseType: 'arraybuffer',
    });

    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    const fileToSave = new this.fileModel({
      owner: userId,
      path: avatarUrl,
      base64,
    });

    fs.writeFileSync(filepath, response.data);

    await fileToSave.save();

    return base64;
  }

  async delete(userId: number, avatarUrl: string) {
    const file = await this.fileModel.findOne({
      owner: userId,
      path: avatarUrl,
    });

    if (file) {
      const filepath = `tmp/${file.path.split('/').pop()}`;
      fs.unlinkSync(filepath);
      await this.fileModel.deleteOne({ owner: userId, path: avatarUrl });
    }

    return;
  }
}

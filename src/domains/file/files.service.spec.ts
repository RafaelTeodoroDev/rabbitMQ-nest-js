import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './schema/file.schema';
import * as fs from 'fs';
import axios from 'axios';
import { FileService } from './files.service';

describe('FileService', () => {
  let fileService: FileService;
  let fileModel: Model<FileDocument>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getModelToken(File.name),
          useValue: Model,
        },
      ],
    }).compile();

    fileService = moduleRef.get<FileService>(FileService);
    fileModel = moduleRef.get<Model<FileDocument>>(getModelToken(File.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAvatarAndSave', () => {
    it('should save avatar in database and return base64', async () => {
      const userId = 1;
      const avatarUrl = 'https://example.com/avatar.png';
      const response = { data: 'someImageData' };
      const base64 = 'c29tZUlETWltYmV0YQ==';

      const file = {
        owner: 1,
        path: 'https://example.com/avatar.png',
        base64: 'c29tZUlETWltYmV0YQ==',
        response: { data: 'someImageData' }
      };
      

      jest.spyOn(fileModel, 'findOne').mockResolvedValue(file);
      jest.spyOn(axios, 'get').mockResolvedValue(response);
      jest.spyOn(Buffer, 'from').mockReturnValue(Buffer.from(base64, 'base64'));
      jest.spyOn(fs, 'writeFileSync').mockImplementation(jest.fn());
      jest.spyOn(fileModel.prototype, 'save').mockResolvedValueOnce({
        owner: userId,
        path: avatarUrl,
        base64,
      });

      const result: any = await fileService.getAvatarAndSave(userId, avatarUrl);
      expect(result.base64).toBe(base64);
    });

    it('should return file if it is already saved', async () => {
      const userId = 1;
      const avatarUrl = 'https://example.com/avatar.png';
      const file = {
        owner: userId,
        path: avatarUrl,
        base64: 'c29tZUlETWltYmV0YQ==',
      };

      jest.spyOn(fileModel, 'findOne').mockResolvedValue(file);

      const result = await fileService.getAvatarAndSave(userId, avatarUrl);

      expect(result).toEqual(file);
    });
  });

  describe('delete', () => {
    it('should delete file from database and filesystem', async () => {
      const userId = 1;
      const avatarUrl = 'https://example.com/avatar.png';
      const file = {
        owner: userId,
        path: avatarUrl,
        base64: 'c29tZUlETWltYmV0YQ==',
      };

      jest.spyOn(fileModel, 'findOne').mockResolvedValue(file);
      jest.spyOn(fs, 'unlinkSync').mockImplementation(jest.fn());
      jest.spyOn(fileModel, 'deleteOne').mockResolvedValueOnce(null);

      await fileService.delete(userId, avatarUrl);

      expect(fs.unlinkSync).toHaveBeenCalledWith('tmp/avatar.png');
    });

    it('should not throw error if file is not found', async () => {
      const userId = 1;
      const avatarUrl = 'https://example.com/avatar.png'
      jest.spyOn(fileModel, 'findOne').mockResolvedValue(null);

      await expect(fileService.delete(userId, avatarUrl)).resolves.toBeUndefined();
      expect(fs.unlinkSync).not.toHaveBeenCalled();
    });
  })
});
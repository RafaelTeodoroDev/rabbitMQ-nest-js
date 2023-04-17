import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';
import { File, FileSchema } from './schemas/file.schema';
import { FileService } from './file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: File.name, schema: FileSchema },]),
    DatabaseModule,
    MailModule
  ],
  controllers: [UsersController],
  providers: [UsersService, FileService],
})
export class UsersModule {}
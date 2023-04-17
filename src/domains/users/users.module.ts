import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { DatabaseModule } from '../../infra/database/database.module';
import { MailModule } from '../../infra/mail/mail.module';
import { FileSchema, File } from '../file/schema/file.schema';
import { FileService } from '../file/files.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: File.name, schema: FileSchema },
    ]),
    DatabaseModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, FileService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';
import { File, FileSchema } from './schemas/file.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: File.name, schema: FileSchema },]),
    DatabaseModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
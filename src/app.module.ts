import { Module } from '@nestjs/common';
import { UsersModule } from './domains/users/users.module';
import { DatabaseModule } from './infra/database/database.module';
import { MailModule } from './infra/mail/mail.module';

@Module({
  imports: [DatabaseModule, UsersModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

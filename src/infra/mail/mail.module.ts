import { Module } from '@nestjs/common';
import { Mail } from './sendEmail.service';

@Module({
  imports: [],
  controllers: [],
  providers: [Mail],
  exports: [Mail]
})
export class MailModule {}
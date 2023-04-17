import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongodb:mongodb@cluster0.aqzroec.mongodb.net/payever',
    ),
  ],
})
export class DatabaseModule {}

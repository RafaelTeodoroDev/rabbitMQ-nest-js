import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mail } from '../../infra/mail/sendEmail.service';
import { User, UserDocument } from './schemas/user.schema';
import axios from 'axios';
import { MessagingService } from 'src/infra/messaging/messaging.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: Mail,
    private readonly messagingService: MessagingService
  ) {}

  async createUser(name: string, email: string, age: number): Promise<User> {
    const createdUser = new this.userModel({ name, email, age });

    try {
      await this.mailService.sendEmail(
        email,
        'User Created',
        'User Created',
      );
    } catch (err) {
      console.log('Failed to send email');
      console.log(err);
    }

    await this.messagingService.sendMessage(JSON.stringify(createdUser))

    return createdUser.save();
  }

  async findOne(id: number): Promise<User> {
    const { data } = await axios.get(`https://reqres.in/api/users/${id}`);

    return data;
  }
}

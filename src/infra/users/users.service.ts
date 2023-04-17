import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mail } from '../mail/sendEmail.service';
import { User, UserDocument } from './schemas/user.schema';
import axios from 'axios';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: Mail,
  ) {
  }

  async createUser(name: string, email: string, age: number): Promise<User> {
    const createdUser = new this.userModel({ name, email, age });

    try{
      await this.mailService.sendEmail(email, 'Seu usuário foi criado', 'Criação de usuário')
    }catch (err){
      console.log('Failed to send email')
      console.log(err)
    }

    return createdUser.save();
  }

  async findOne(id: number): Promise<User> {
    const { data } = await axios.get(`https://reqres.in/api/users/${id}`)

    return data
  }
}
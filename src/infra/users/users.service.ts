import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Mail } from '../mail/sendEmail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: Mail
  ) {}

  async createUser(name: string, email: string, age: number): Promise<User> {
    const createdUser = new this.userModel({ name, email, age });

    try{
      await this.mailService.sendEmail(email, 'Seu usuário foi criado', 'Criação de usuário')
    }catch (err){
      console.log('Failed to send email')
      console.log(err)
    }

    //Enviar evento ao coelho

    return createdUser.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).populate('avatar').exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
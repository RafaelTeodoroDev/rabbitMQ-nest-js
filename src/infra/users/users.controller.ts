import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/createUserDTO';
import { MessagePattern } from '@nestjs/microservices'
import { FileService } from '../file/files.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FileService
    ) {}

  @MessagePattern('create.user')
  @Post()
  async create(@Body() body: CreateUserDto) {
    const { name, email, age } = body
    
    return this.usersService.createUser(name, email, age)
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':id/avatar')
  async getAvatar(@Param('id') id: number, @Body() body){
    const { avatarUrl } = body
    return this.fileService.getAvatarAndSave(id, avatarUrl)
  }

  @Delete(':id/avatar')
  async delete(@Param('id') id: number, @Body() body): Promise<void> {
    const { avatarUrl } = body
    return this.fileService.delete(id, avatarUrl);
  }
}
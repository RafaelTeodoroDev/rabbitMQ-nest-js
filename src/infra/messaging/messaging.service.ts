import { Inject, Injectable } from '@nestjs/common';
import {  ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessagingService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendMessage(message: string): Promise<void> {
    await this.client.emit<number>('message', message);
  }
}
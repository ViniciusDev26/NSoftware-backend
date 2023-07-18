import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { query } from 'express';
import { Socket } from 'socket.io';
import { SocketGateway } from 'src/socket.gateway';
import { ChatService } from '../service/chat.service';

@Controller('/chat')
export class ChatController {
  constructor(
    private readonly socketGateway: SocketGateway,
    readonly service: ChatService,
  ) {}

  @Post('/typing')
  sendTypingEvent(@Body() data: any) {
    const { isTyping } = data;
    console.log(isTyping);
    const client: Socket = null; // Substitua null pelo cliente Socket recebido do frontend
    this.socketGateway.handleTyping(client, isTyping); // Aciona o evento 'typing' no SocketGateway
  }

  @Post('/message')
  sendMessage(@Body() data: any) {
    const { message } = data;
    const client: Socket = null;
    this.socketGateway.handleMessage(client, message);
    return { success: true, message: 'Mensagem enviada com sucesso' };
  }

  @Get('/historyMessage')
  async retrieveMessages(@Query() params: any) {
    const retrive = await this.service.retrive(params);
    return retrive;
  }
}

import { Module } from '@nestjs/common';
import { SocketGateway } from 'src/socket.gateway';
import { ChatController } from './Cotrollers/Chat.Controller';
import { ChatService } from './service/chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, SocketGateway],
  exports: [ChatService],
})
export class ChatModule {} // Renomeado para 'ChatModule' com letra maiúscula

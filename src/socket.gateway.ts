// socket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './Chat/service/chat.service';

type propsMessager = {
  userId: string;
  companyId: string;
  message: string;
};
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(readonly service: ChatService) {}
  @WebSocketServer()
  server: Server;

  private connectedClients = new Map<string, boolean>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    const companyId = client.handshake.query.companyId;

    this.connectedClients.set(client.id, false);
    this.updateConnectedUsers();
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.updateConnectedUsers();
  }

  updateConnectedUsers() {
    const connectedUsers = [...this.connectedClients.keys()];
    this.server.emit('usersOnline', connectedUsers);
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, data: { isTyping: boolean }) {
    this.connectedClients.set(client.id, data.isTyping);
    this.server.emit('typing', {
      clientId: client.id,
      isTyping: data.isTyping,
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: { message: string }) {
    const userId = client.handshake.query.userId as string;
    const companyId = client.handshake.query.companyId as string;
    const saveMenssage: propsMessager = {
      userId,
      companyId,
      message: data.message,
    };
    const service = this.service.saveMessage(saveMenssage);

    // Opcional: Se você quiser enviar uma mensagem específica de resposta apenas para o cliente que enviou a mensagem, use o código abaixo.
    client.emit('message', {
      service,
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/database/repositories/prisma/chat-prisma.repository';

type methodosMessagesProps = {
  message: string;
  userId: string;
  companyId: string;
};

@Injectable()
export class ChatService {
  constructor(readonly repository: ChatRepository) {}
  async saveMessage(body: methodosMessagesProps) {
    if (!body.userId || !body.companyId) {
      throw new HttpException(
        'Error - Parametros inválidos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const repository = this.repository.saveMessage(body);
    return repository;
  }

  async retrive(query) {
    const { userId, companyId } = query;

    if (!userId || !companyId) {
      throw new HttpException(
        'Error - Parametros inválidos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const repository = this.repository.retrive(query);
    return repository;
  }
}

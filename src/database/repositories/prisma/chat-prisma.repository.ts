import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

type methodosMessagesProps = {
  message: string;
  userId: string;
  companyId: string;
};
@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}
  async saveMessage(body: methodosMessagesProps) {
    const { userId, companyId, message } = body;

    try {
      await this.prisma.message.create({
        data: {
          userId,
          companyId,
          content: message,
        },
      });
      const history = this.prisma.message.findMany({
        where: {
          userId,
          companyId,
        },
      });
      return history;
    } catch {
      throw new HttpException(
        'Error Interno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async retrive(query) {
    console.log(query);

    try {
      const allMensagens = await this.prisma.message.findMany({
        where: {
          companyId: query.companyId,
          userId: query.userId,
        },
        include: {
          user: {
            select: {
              wage: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return allMensagens;
    } catch {
      throw new HttpException(
        'Error Interno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

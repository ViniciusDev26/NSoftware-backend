import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

type employeeProps = {
  companyId: number;
  AddressId: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  wage: number;
  obs: string;
  codeEmployee: number;
  id: string;
};

@Injectable()
export class employeeRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getEmployee(params: employeeProps): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const handleGetEmployee: any =
          await this.prismaService.account.findMany({
            where: {
              codeEmployee: params.codeEmployee,
            },
          });

        const returnEmployee = await Promise.all(
          handleGetEmployee.map(async (element: employeeProps) => {
            if (element.roleId) {
              const { role } = await this.prismaService.role.findUnique({
                where: {
                  id: element.roleId,
                },
              });
              return {
                name: element.name,
                idUser: element.id,
                roleEmployee: role,
                wage: element.wage,
                email: element.email,
              };
            }
            return {
              name: element.name,
              idUser: element.id,
              roleEmployee: element.roleId,
              wage: element.wage,
              email: element.email,
            };
          }),
        );

        resolve(returnEmployee);
      } catch (error) {
        reject(error);
      }
    });
  }

  async patchEmployee(param: employeeProps) {
    try {
      await this.prismaService.account.update({
        where: {
          email: param.email,
        },
        data: {
          roleId: param.roleId,
          wage: param.wage,
        },
      });
      throw new HttpException('Success', HttpStatus.ACCEPTED);
    } catch {
      throw new HttpException(
        'Error - Não foi possível alterar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { getAllClientsDTO } from 'src/account/dtos/getAllClients.dto';
import { Account } from 'src/shared/entities/Account';

export abstract class getClientsRepository {
  findByEmpresaId: (companyId: getAllClientsDTO) => Promise<Account | any>;
}

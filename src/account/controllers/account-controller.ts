import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateAccountService } from '../services/create-account.service';
import { CreateAccountDTO } from '../dtos/create-account.dto';
import { getAllClientsDTO } from '../dtos/getAllClients.dto';
import { updateAccountDTO } from '../dtos/update-account.dto';
import { deteleClienteDTO } from '../dtos/delete-cliente.dto';

@Controller('/account')
export class AccountController {
  constructor(private readonly createAccountService: CreateAccountService) {}

  @Post('/')
  async createAccount(@Body() params: CreateAccountDTO) {
    await this.createAccountService.execute(params);
  }

  @Patch('/')
  async patchAccount(@Body() Param: updateAccountDTO) {
    const edit = await this.createAccountService.editUser(Param);
    return edit;
  }

  @Post('/delete')
  async deleteEmployee(@Body() email: deteleClienteDTO) {
    const deletion = await this.createAccountService.deleteUser(email);
    return deletion;
  }
  @Get('/clients')
  async getClients(@Query() companyId: getAllClientsDTO) {
    const clients = await this.createAccountService.getAllClients(companyId);
    return clients;
  }
}

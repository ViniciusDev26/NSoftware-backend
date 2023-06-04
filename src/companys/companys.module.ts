import { Module } from '@nestjs/common';
import { companysController } from './controllers/companys.controller';
import { companyService } from './services/companys.service';

@Module({
  controllers: [companysController],
  providers: [companyService],
})
export class companyModule {}

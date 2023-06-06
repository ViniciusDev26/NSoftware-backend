import { Module } from '@nestjs/common';
import { roleController } from './controller/role.controller';
import { roleService } from './service/role.service';

@Module({
  controllers: [roleController],
  providers: [roleService],
})
export class roleModule {}

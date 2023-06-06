import { Module } from '@nestjs/common';
import { employeeController } from './controller/employee-controller';
import { employeeService } from './service/employee.service';

@Module({
  controllers: [employeeController],
  providers: [employeeService],
})
export class employeeModule {}

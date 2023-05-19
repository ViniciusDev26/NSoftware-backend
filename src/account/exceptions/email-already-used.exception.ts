import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyUsedException extends HttpException {
  constructor() {
    super('email already used', HttpStatus.FORBIDDEN);
  }
}

import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthenticationDTO } from '../dtos/Authentication.dto';
import { AuthenticateService } from '../services/authenticate.service';

@Controller('/auth')
export class AuthenticationController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post('/')
  async doLogin(@Body() params: AuthenticationDTO) {
    const token = await this.authenticateService.execute(params);

    if (!token) {
      throw new UnauthorizedException('email or password is invalid');
    }

    return token;
  }
}

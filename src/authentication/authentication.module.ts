import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import env from 'src/shared/constants/env';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticateService } from './services/authenticate.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwtSecretKey,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthenticateService, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService , AuthService],
})
export class AppModule {}

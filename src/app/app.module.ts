import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseController } from 'src/database/database.controller';
import { DatabaseService } from 'src/database/database.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/auth/user.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',   // XAMPP usually runs MySQL on localhost
      port: 3306,          // default MySQL port
      username: 'root',    // default XAMPP MySQL user
      password: '',        // usually empty in XAMPP (check phpMyAdmin)
      database: 'IRS',  // replace with your phpMyAdmin DB name
      autoLoadEntities: true,
      synchronize: true,   // auto create tables (good for dev, not prod)
    }),

  ],
  controllers: [AppController, AuthController, DatabaseController],
  providers: [AppService, AuthService, DatabaseService, JwtService, UserDto],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('auth');
  }
}

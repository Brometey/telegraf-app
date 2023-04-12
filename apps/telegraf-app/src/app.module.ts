import { Global, Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceAskScene } from './scenes/service-ask-scene';
import { LoginAskScene } from './scenes/login-ask-scene';

const sessions = new LocalSession({ database: 'session_db.json' });

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TG_TOKEN'),
        middlewares: [sessions.middleware()],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [AppService, AppUpdate, ServiceAskScene, LoginAskScene],
})
export class AppModule {}

import { AppService } from './app.service';
import { Markup, Telegraf } from 'telegraf';
import { InjectBot, Update, Start, Command, Ctx } from 'nestjs-telegraf';

import { Context } from './context.interface';
import { exitButton } from './buttons/exit.button';
const SceneContext = require('telegraf');

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startBot(ctx: Context) {
    ctx.replyWithHTML(
      `Welcome to <strong>Credentials Holder Bot!</strong>\n\n` +
        ` We're glad to see you, <b>${ctx.from.username} 👽</b>!\n\n` +
        `Use /help to check available commands.`,
    );
  }

  @Command('new_credential')
  async newCredCommand(@Ctx() ctx: typeof SceneContext) {
    ctx.scene.enter('addCredential');
  }

  @Command('help')
  async help(@Ctx() ctx: typeof SceneContext) {
    ctx.replyWithHTML();
  }
}

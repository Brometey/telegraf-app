import { AppService } from './app.service';
import { Telegraf } from 'telegraf';
import { InjectBot, Update, Start, Command, Ctx } from 'nestjs-telegraf';
import { Context } from './context.interface';
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
      `Welcome to <strong>Credentials Holder Bot!</strong> We're glad to see you, <b>${ctx.from.username}</b>!`,
    );
  }

  @Command('new_credential')
  async newCredCommand(@Ctx() ctx: typeof SceneContext) {
    ctx.scene.enter('askService');
  }
}

import { Scene, InjectBot, SceneEnter, Ctx, On } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
const SceneContext = require('telegraf');

@Scene('askLogin')
export class LoginAskScene {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @SceneEnter()
  async enterScene(@Ctx() ctx: typeof SceneContext) {
    await ctx.reply('Input login.');
    const serviceName = ctx.scene.state.serviceName;
  }

  //   @On('text')
  //   async onLogin(@Ctx() ctx: typeof SceneContext) {
  //     console.log('ure in');
  //     await ctx.scene.leave();
  //   }
}

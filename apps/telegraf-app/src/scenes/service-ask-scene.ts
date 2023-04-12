import { Ctx, InjectBot, On, Scene, SceneEnter } from 'nestjs-telegraf';
const SceneContext = require('telegraf');

@Scene('askService')
export class ServiceAskScene {
  @SceneEnter()
  async enter(@Ctx() ctx: typeof SceneContext) {
    await ctx.reply('Input service name');
  }

  @On('text')
  async onServiceName(@Ctx() ctx: typeof SceneContext) {
    ctx.scene.enter('askLogin', { serviceName: ctx.message.text });
    ctx.scene.leave();
  }
}

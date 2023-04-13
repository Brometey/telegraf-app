import { Ctx, Hears, Wizard, WizardStep } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { exitButton } from '../buttons/exit.button';
import { passwordButtons } from '../buttons/passwordStep.buttons';

@Wizard('addCredential')
export class CredentialScene {
  @WizardStep(1)
  async serviceStep(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.replyWithHTML('<b>Please, input service name:</b>', exitButton());
    ctx.wizard.next();
  }

  @WizardStep(2)
  @Hears(/^(?!\/).*$/)
  async loginStep(@Ctx() ctx) {
    ctx.session.serviceName = ctx.message.text;
    // TODO: validation for login.
    await ctx.replyWithHTML('<b>Please, input login.</b>', exitButton());
    ctx.wizard.next();
  }

  @WizardStep(3)
  @Hears(/^(?!\/).*$/)
  async passwordStep(@Ctx() ctx) {
    ctx.session.login = ctx.message.text;
    await ctx.replyWithHTML(
      '<b>Please, input password.</b>',
      passwordButtons(),
    );
    ctx.wizard.next();
  }

  @WizardStep(4)
  @Hears(/^(?!\/).*$/)
  async saveCredentials(@Ctx() ctx) {
    await ctx.reply(
      `Service name is *${ctx.session.serviceName}*\n\nYour login: *${ctx.session.login}*\n\nYour password: *||${ctx.message.text}||*`,
      { parse_mode: 'MarkdownV2' },
    );
    ctx.scene.leave();
  }
}

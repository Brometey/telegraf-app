import { Markup } from 'telegraf';

export function exitButton() {
  return Markup.inlineKeyboard([Markup.button.callback('Exit', 'exit')]);
}

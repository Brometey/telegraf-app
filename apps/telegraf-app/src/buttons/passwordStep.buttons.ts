import { Markup } from 'telegraf';

export function passwordButtons() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('generate', 'generate'),
      Markup.button.callback('write', 'write'),
      Markup.button.callback('exit', 'exit'),
    ],
    { columns: 2 },
  );
}

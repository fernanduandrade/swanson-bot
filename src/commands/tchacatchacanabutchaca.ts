import { ICommand } from "wokcommands";

export default {
    category: 'Nice',
    description: 'skylab alguma coisa',
    callback: async ({ message }) => {
        await message.reply('https://tenor.com/view/skylab-defante-aplauso-gif-23138015');
    }
} as ICommand;
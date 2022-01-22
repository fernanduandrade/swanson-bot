import { ICommand } from "wokcommands";

export default {
    category: 'Sad',
    description: 'Acontece',
    callback: async ({ message }) => {
        await message.reply('https://tenor.com/view/michael-scott-steve-carell-crying-sad-tears-gif-7910100');
    }
} as ICommand;
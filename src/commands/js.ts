import { ICommand } from "wokcommands";

export default {
    category: 'GIF',
    description: 'evo mata o javascripto',
    callback: async ({ message }) => {
        await message.reply('https://media.tenor.com/MzJE99H8NLsAAAAC/js-javascript.gif?t=AAXbbhcoXNkKtB37sgCfBg');
    }
} as ICommand;
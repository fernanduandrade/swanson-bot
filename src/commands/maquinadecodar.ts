import { ICommand } from "wokcommands";

export default {
    category: 'Motivation',
    description: 'Pedreios de códigos.',
    callback: async ({ message }) => {
        await message.reply('https://cdn.discordapp.com/attachments/662667257658474519/928019803606777876/IMG_20220104_171915.jpg');
    }
} as ICommand;
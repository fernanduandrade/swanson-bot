import { ICommand } from "wokcommands";

export default {
    category: 'Compliment',
    description: 'Bom dia amigos.',
    callback: async ({ message }) => {
        await message.reply('https://tenor.com/view/webamigos-bom-dia-caralho-caralho-krl-gif-21817066');
    }
} as ICommand;
import { ICommand } from "wokcommands";

export default {
    category: 'Anúncio',
    description: 'Faz um anúncio.',
    callback: async ({message}) => {
        let announcement = message.content.split('!announcement')[1];
        await message.channel.send(`É o seguinte @everyone o ${message.author.username} informa que ${announcement}`);
    }
} as ICommand;
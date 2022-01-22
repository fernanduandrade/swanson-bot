import { ICommand } from "wokcommands";

export default {
    category: 'Helpful',
    description: 'Retorna ping do usuário!',
    callback: async ({ message }) => {
        const messagem = message.reply('!Pong!');
        (await messagem).edit(`Ping é de ${(await messagem).createdTimestamp - message.createdTimestamp}ms!`);
    }
} as ICommand;
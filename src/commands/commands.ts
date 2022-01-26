import { ICommand } from "wokcommands";
import fs from 'fs';

export default {
    category: 'Helpful',
    description: 'Lista os comandos',
    callback: async ({message}) => {
        const cmdDirs = fs.readdirSync('./src/commands').map(f => f.replace('.ts', ' \n'));
        const answer =
      String.raw`
      Usar ! para os seguintes comandos:  
${cmdDirs.map(element => element).join(' ')}
      `;
        await message.reply(answer);
    }
} as ICommand;
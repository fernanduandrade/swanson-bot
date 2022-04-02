import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import WOKCommands from 'wokcommands';
import { msgBag } from './src/utils/messageBag';
import { sleep } from './src/utils/sleep';
import { welcome } from './src/events/welcome';

dotenv.config()

const client = new DiscordJS.Client({intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', async () => {
    welcome(client);
    new WOKCommands(client, {
        commandDir: path.join(__dirname, './src/commands'),
        typeScript: true
    });
    while (1) {
        client.user?.setActivity(msgBag[Math.floor(Math.random() * msgBag.length)], { type: "PLAYING"});
        await sleep(30000);
    }
});


client.login(process.env.TOKEN);
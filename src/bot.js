import discord from 'discord.js';
import dotenv from 'dotenv';
import api from './services/api.js';
import axios from 'axios';
dotenv.config();
const bot = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"] });
bot.once('ready', () => console.log('online!'));
bot.on('message', msg => {
    if(msg.content.includes('!git')) {
        msg.delete();
        let username = msg.content.split(" ")[1];
        axios.get(`https://api.github.com/users/${username}`).then(result => {
            console.log(username);
            console.log(result.data);
            const embedInfo = new discord.MessageEmbed()
                .setAuthor(result.data.login, result.data.avatar_url, 'https://google.com')
                .setTitle('Github profile')
                .setDescription((result.data.bio === null ? 'não tem bio' : result.data.bio))
                .setColor('#d32256')
                .setFooter(`quantidade de repositórios: ${result.data.public_repos}`)
                
            console.log(embedInfo)
            msg.channel.send({embeds: [embedInfo]});
        });
    }

    if(msg.content === '!stock') {
        // https://fcsapi.com/api-v3/forex/base_latest?symbol=USD&type=forex&access_key=7koiEQwY5zjG3Lmo09Hc'
        api.get('base_latest?symbol=USD&type=forex&access_key=7koiEQwY5zjG3Lmo09Hc').then(result => {
            msg.reply(`${result.data.msg}`)
        });
    }

    if(msg.content === '!fracasso') {
        api.get('history?symbol=USD/JPY&period=1h&access_key=7koiEQwY5zjG3Lmo09Hc').then(result => {
            msg.reply(`${result.data.response['1640070000'].tm}`)
        })
    }

    if(msg.content === '!maquinadecodar') {
        msg.reply('https://cdn.discordapp.com/attachments/662667257658474519/928019803606777876/IMG_20220104_171915.jpg');
    }
});

bot.login(process.env.TOKEN);


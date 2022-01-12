import discord from 'discord.js';
import dotenv from 'dotenv';
import api from './services/api.js';
import axios from 'axios';
dotenv.config();
const bot = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"] });

const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))};
const msgs = [
    'Meta é virar pleno',
    'Escrevemos código',
    'Javascripto, typescripto, C HashTAg',
    'Spring Boot, GoLang, Node, DotnEt',
];
bot.once('ready', async() => {
    while (1) {
        bot.user.setActivity(msgs[Math.floor(Math.random() * msgs.length)], { type: "PLAYING"});
        await sleep(30000);
    }
});
bot.on('message', async msg => {
    if(msg.content === '!ping') {
        msg.delete();
        const mensagem = await msg.channel.send('?Ping');
        mensagem.edit(`!Pong, o ping é de ${mensagem.createdTimestamp - msg.createdTimestamp}ms!`);
    }

    if(msg.content === '!quebreiprod') {
        await msg.reply('https://tenor.com/view/michael-scott-steve-carell-crying-sad-tears-gif-7910100');
    }
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
                
            msg.channel.send({embeds: [embedInfo]});
        });
    }

    if(msg.content === '!teste') {
        msg.delete();
        // https://fcsapi.com/api-v3/forex/base_latest?symbol=USD&type=forex&access_key=7koiEQwY5zjG3Lmo09Hc'
        api.get('base_latest?symbol=USD&type=forex&access_key=7koiEQwY5zjG3Lmo09Hc').then(result => {
            console.log(result.data);
            msg.reply(`${result.data.msg}`)
        });
    }

    if(msg.content === '!teste1') {
        msg.delete();
        api.get('profile?symbol=USD&access_key=7koiEQwY5zjG3Lmo09Hc').then(result => {
            console.log(result.data);
            msg.reply(`${result.data.msg}`)
        })
    }

    if(msg.content === '!teste2') {
        msg.delete();
        api.get('economy_cal?symbol=USD,JPY&from=2022-01-11&to=2022-01-12&access_key=7koiEQwY5zjG3Lmo09Hc').then(result => {
            console.log(result.data);
        })
    }

    if(msg.content === '!bomdia') {
        msg.reply('https://tenor.com/view/webamigos-bom-dia-caralho-caralho-krl-gif-21817066');
    }

    if(msg.content === '!fracasso') {
        msg.delete();
        api.get('history?symbol=USD/JPY&period=1h&access_key=7koiEQwY5zjG3Lmo09Hc').then(result => {
            msg.reply(`${result.data.response['1640070000'].tm}`)
        })
    }

    if(msg.content === '!maquinadecodar') {
        msg.reply('https://cdn.discordapp.com/attachments/662667257658474519/928019803606777876/IMG_20220104_171915.jpg');
    }

    if(msg.content === '!tchacatchacanabutchaca') {
        await msg.reply('https://tenor.com/view/skylab-defante-aplauso-gif-23138015')
    }
});

bot.login(process.env.TOKEN);


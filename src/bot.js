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

    if(msg.content.includes('!color')) {
        const color = msg.content.split(' ')[1];
        return msg.guild.roles.create({
            name: msg.author.tag,
            color: color,
            mentionable: false,
            position: 60
        })
        .then(role => {
            msg.reply(`Teste mudar de cor`)
            msg.member.roles.add(role);
        })
        .catch(() => msg.reply('deu ruim'));
    }

    if(msg.content.includes('!github')) {
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

    if(msg.content === '!maquinadecodar') {
        msg.reply('https://cdn.discordapp.com/attachments/662667257658474519/928019803606777876/IMG_20220104_171915.jpg');
    }

    if(msg.content === '!tchacatchacanabutchaca') {
        await msg.reply('https://tenor.com/view/skylab-defante-aplauso-gif-23138015')
    }

    if(msg.content === '!bomdia') {
        msg.reply('https://tenor.com/view/webamigos-bom-dia-caralho-caralho-krl-gif-21817066');
    }

    
});

bot.login(process.env.TOKEN);


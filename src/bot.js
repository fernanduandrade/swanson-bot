import discord from 'discord.js';
import dotenv from 'dotenv';
import api from './services/api.js';
import axios from 'axios';
dotenv.config();
const bot = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"] });

const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))};
const msgs = [
    'Meta é virar pleno',
    'Pedreiros de código',
    'Javascripto, typescripto, C HashTAg',
    'Spring Boot, GoLang, Node, DotnEt',
    'public long Name {get; set;}'
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
        msg.delete();
        await msg.reply('https://tenor.com/view/michael-scott-steve-carell-crying-sad-tears-gif-7910100');
    }

    if(msg.content.includes('!doguinho')) {
        msg.delete();
        const dogBreed = msg.content.split(' ')[1];
        const apiDog =  `https://dog.ceo/api/breed/${dogBreed}/images/random`;
        axios.get(apiDog).then(result => {
            msg.reply(result.data.message);
        }).catch(() => msg.reply('``❌`` Cachorro invalida!'))
    }

    if(msg.content.includes('!color')) {
        msg.delete();
        const color = msg.content.split(' ')[1];
        
		const nick = msg.author.tag;
        const role = msg.guild.roles.cache.find(x => /.+#\d{4}/i.test(x.name));
        
        if (!role) {
            return msg.guild.roles.create({
                    name: nick,
                    color: color,
                    mentionable: false,
                    position: 60,
                })
                .then(newRole => {
                    msg.reply(
                        `Cor criada com sucesso! hex(${newRole.color})`
                    );

                    msg.member.addRole(newRole);
                })
                .catch(() => msg.reply('``❌`` Cor invalida!'));
        }
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
        msg.delete();
        msg.reply('https://cdn.discordapp.com/attachments/662667257658474519/928019803606777876/IMG_20220104_171915.jpg');
    }

    if(msg.content === '!tchacatchacanabutchaca') {
        msg.delete();
        await msg.reply('https://tenor.com/view/skylab-defante-aplauso-gif-23138015')
    }

    if(msg.content === '!bomdia') {
        msg.delete();
        msg.reply('https://tenor.com/view/webamigos-bom-dia-caralho-caralho-krl-gif-21817066');
    }

    
});

bot.login(process.env.TOKEN);


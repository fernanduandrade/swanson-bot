import discord from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

dotenv.config();
const bot = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"] });

bot.once('ready', () => console.log('funcionando!'));
bot.on('message', msg => {
    if(msg.content === '!tchacatchacanabutchaca') {
        msg.reply('https://tenor.com/view/skylab-defante-aplauso-gif-23138015');
    }

    if(msg.content === '!stock') {
        // https://fcsapi.com/api-v3/forex/base_latest?symbol=USD&type=forex&access_key=7koiEQwY5zjG3Lmo09Hc'
        axios.get('https://fcsapi.com/api-v3/forex/base_latest?symbol=USD&type=forex&access_key=7koiEQwY5zjG3Lmo09Hc').then(result => {
            msg.reply(`${result.data.msg}`)
        });
    }

    if(msg.content === '!fracasso') {
        axios.get('https://fcsapi.com/api-v3/forex/history?symbol=USD/JPY&period=1h&access_key=7koiEQwY5zjG3Lmo09Hc').then(result => {
            msg.reply(`${result.data.response['1640070000'].tm}`)
        })
    }

    if(msg.content === '!maquinadecodar') {
        msg.reply('https://cdn.discordapp.com/attachments/662667257658474519/928019803606777876/IMG_20220104_171915.jpg');
    }
});

bot.login(process.env.TOKEN);


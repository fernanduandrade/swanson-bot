import { ICommand } from "wokcommands";
import axios from 'axios';
import DiscordJS from 'discord.js';

export default {
    category: 'Info',
    description: 'Retorna o perfil do github',
    callback: async ({ message }) => {
        let username = message.content.split(' ')[1];
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const embedInfo = new DiscordJS.MessageEmbed()
                .setAuthor({
                    name: response.data.login,
                    iconURL: response.data.avatar_url
                })
                .setTitle('Perfil do Github')
                .addFields(
                    {name: 'Biografia', value: (response.data.bio === null ? 'não tem bio' : response.data.bio)},
                    {name: 'Quantidade de repositórios', value: String(response.data.public_repos)},
                )
                .setFooter({
                    text: `executado por ${message.author.username}`
                })
                .setColor('#d32256')
                .setTimestamp()
                
        message.channel.send({embeds: [embedInfo]});
    }
} as ICommand;
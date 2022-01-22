import { ICommand } from "wokcommands";
import axios from 'axios';

export default {
    category: 'Cute',
    description: 'Retorna imagens aleatórias.',
    callback: async ({ message }) => {
        const dogBreed = message.content.split(' ')[1];
        try {
            const response = await axios.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
            message.channel.send(response.data.message);
        } catch(error) {
            message.reply('``❌`` Raça invalida!');
        }
    }
} as ICommand;
import { ICommand } from "wokcommands";
import axios from 'axios';

export default {
    category: 'Search',
    description: 'pesquisar um tópico na wikipedia',
    callback: async ({message}) => {
      const lang = message.content.split(' ')[1];
      const topic = message.content.split(' ')[2];
      try {
          const response = await axios.get(`https://${lang}.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${topic}`);
          message.channel.send(`link --> ${response.data[3][0]}`);
      } catch(error) {
          message.reply('``❌``');
      }
    }
} as ICommand;
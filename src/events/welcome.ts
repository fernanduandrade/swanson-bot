import DiscordJS from 'discord.js'

export const welcome = (client: DiscordJS.Client) => {
  client.on('guildMemberAdd', async (member) => {
    member.send(`Bem vindo <@${member.id}> ao swansons  =D`);
  })
}
import 'dotenv/config';
import { Client, Message, User, Channel } from '..';
import type { Guild } from '../structures';

const client = new Client({
	intents: 131071 // All intents
});

client.on('message', (message: Message) => {
	// Only run if the user isn't a webhook
	if (!(message.author instanceof User)) return;
	if (message.content === 'test message')
		void message.reply({
			content: 'pong!'
		});

	if (message.content === 'test embed')
		void message.reply({
			embeds: [
				{
					description: 'hey an embed'
				}
			]
		});
});

client.on("channelCreate", (channel: Channel) => {
	console.log(`A new channel called ${channel.name} was created!`)
})

client.on("channelDelete", (channel: Channel) => {
	console.log(`A channel called ${channel.name} was deleted!`)
})

client.on("guildCreate", (guild: Guild) => {
	console.log(`A new guild called ${guild.name} was created!`)
})

client.on("guildDelete", (guild: Guild) => {
	console.log(`A guild called ${guild.name} was deleted!`)
})

client.login("OTU3NzEwMDQwNTM2NTkyNDY1.YkCu-w.YLVGAVtZBo65CQreTAK-xlOFNYU");

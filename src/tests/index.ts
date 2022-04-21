import 'dotenv/config';
import { Client, User } from '..';

const client = new Client({
	intents: 131071 // All intents
});

client.on('ready', () => {
	console.log('Bot Initalized');
});

client.on('message', (message) => {
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

client.on('channelCreate', (channel) => {
	console.log(`A new channel called ${channel.name} was created!`);
});

client.on('channelDelete', (channel) => {
	console.log(`A channel called ${channel.name} was deleted!`);
});

client.on('guildCreate', (guild) => {
	console.log(`A new guild called ${guild.name} was created!`);
});

client.on('guildDelete', (guild) => {
	console.log(`A guild called ${guild.name} was deleted!`);
});

client.login();

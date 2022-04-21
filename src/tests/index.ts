import 'dotenv/config';
import { Channel, Client, Message, User } from '..';
import type { Guild } from '../structures';
import type { Interaction } from '../structures/Interaction';

const client = new Client({
	intents: 131071 // All intents
});

client.on('ready', () => {
	console.log('Bot Initalized');
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

client.on('interaction', (interaction: Interaction) => {
	void interaction
		.reply({
			content: 'pong!',
			embeds: [
				{
					description: 'pong!'
				}
			]
		})
		.then((m) => {
			void m.reply({
				content: 'hey i replied to my own interaction :woosh:'
			});
		})
		.catch(console.error);
});

client.on('channelCreate', (channel: Channel) => {
	console.log(`A new channel called ${channel.name} was created!`);
});

client.on('channelDelete', (channel: Channel) => {
	console.log(`A channel called ${channel.name} was deleted!`);
});

client.on('guildCreate', (guild: Guild) => {
	console.log(`A new guild called ${guild.name} was created!`);
});

client.on('guildDelete', (guild: Guild) => {
	console.log(`A guild called ${guild.name} was deleted!`);
});

client.login();

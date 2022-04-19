import type { SlashCommandInteraction } from '#structures/CommandInteraction';
import 'dotenv/config';
import type { Message } from '..';
import { Client } from '..';

const client = new Client();

client.on('message', (message: Message) => {
	console.log(message.content);
	if (message.author.bot) return;

	if (message.content === 'ai!ping') void message.reply('pong!');
});

client.on('slashCommand', (interaction: SlashCommandInteraction) => {
	interaction.reply('yes');
});

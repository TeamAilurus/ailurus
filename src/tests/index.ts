import { Client } from '..';
import type { Message } from '..';
import 'dotenv/config';

const client = new Client();

client.on('message', (message: Message) => {
	console.log(message.content);
	if (message.author.bot) return;

	if (message.content === 'ai!ping') void message.reply('pong!');
});

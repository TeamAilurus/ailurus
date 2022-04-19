import Client from '#client/Client';
import type Message from '#structures/Message';
import 'dotenv/config';

const client = new Client();

client.on('message', (message: Message) => {
	console.log(message.content);
	if (message.author.bot) return;

	if (message.content === 'ai!ping') return message.reply('pong!');
	return;
});

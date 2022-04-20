import 'dotenv/config';
import type { Message } from '..';
import { Client } from '..';

const client = new Client();

client.on('message', (message: Message) => {
	if (message.content === 'ai!ping')
		void message.reply({
			content: 'pong!'
		});
});

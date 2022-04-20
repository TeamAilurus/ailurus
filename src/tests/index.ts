import 'dotenv/config';
import type { Message } from '..';
import { Client } from '..';

const client = new Client();

client.on('message', (message: Message) => {
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

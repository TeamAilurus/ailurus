import 'dotenv/config';
import { Client, Message, User } from '..';

const client = new Client({
	intents: 131071
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

client.login();
